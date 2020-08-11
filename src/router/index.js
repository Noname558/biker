import Vue from 'vue'
import VueRouter from 'vue-router'

import User from '@/core/object/User'
import firebase from 'firebase/app'

import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome'
import Settings from '@/views/Settings'
import CreateMark from '@/views/CreateMark'
import ShowMark from '@/views/ShowMark'

import GuestLayout from '@/layout/GuestLayout'
import UserLayout from '@/layout/UserLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Карта велосепедиста',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Настройки профиля',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/mark/:id',
    name: 'ShowMark',
    component: ShowMark,
    meta: {
      title: 'Метка',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/create/mark/:latitude/:longitude',
    name: 'CreateMrk',
    component: CreateMark,
    meta: {
      title: 'Создание метки',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/like',
    name: 'Like',
    component: () => import('@/views/Like.vue'),
    meta: {
      title: 'Сохраненные метки',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('@/views/Friends.vue'),
    meta: {
      title: 'Друзья',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/InstallApp',
    name: 'InstallApp',
    component: () => import('@/views/InstallApp.vue'),
    meta: {
      title: 'Установить приложение',
      layout: UserLayout,
      authorization: 'user'
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: {
      layout: GuestLayout,
      authorization: 'guest'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.fullPath)
  // Если не был зарегестирирован и хочет перейти куда то внутрь
  if (localStorage.getItem('autId') == null && to.meta.authorization !== 'guest') {
    // Если переход со стартовой страницы, то сделать гостем
    if (from.fullPath === '/welcome') {
      firebase.database().ref('users').push(new User('Имя111'))
        .then(user => {
          localStorage.setItem('autId', user.key)
        })
        .finally(() => {
          next()
        })
    } else {
      next({
        path: '/welcome',
        params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.fullPath === '/' && localStorage.getItem('autId')) {
    next({
      path: '/home',
      params: { nextUrl: to.fullPath }
    })
  } else if (to.fullPath === '/exit' && localStorage.getItem('autId')) {
    delete localStorage.autId
    next({
      path: '/welcome',
      params: { nextUrl: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
