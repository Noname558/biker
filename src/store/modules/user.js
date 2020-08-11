import firebase from 'firebase/app'
export default {
  namespaced: true,
  state: {
    username: 'Неизвестный',
    email: '',
    avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/bikermap-36dd6.appspot.com/o/core%2Fnofoto.jpeg?alt=media&token=75ff303a-fc74-47f7-9cb9-969ef88c596e'
  },
  mutations: {
    // eslint-disable-next-line no-return-assign
    setUsername: (state, value) => state.username = value,
    setEmail (state, value) {
      state.email = value
    },
    setAvatarUrl (state, value) {
      state.avatarUrl = value
    }
  },
  actions: {
    async loadData ({ commit }) {
      const user = (await firebase.database().ref('users').child(localStorage.autId).once('value')).val()
      console.log(user)
      commit('setUsername', user.username)
      commit('setEmail', user.email)
      commit('setAvatarUrl', await firebase.storage().ref('avatars/' + localStorage.autId).getDownloadURL())
    },
    async updateData ({ commit }, fields) {
      await firebase.database().ref('users').child(localStorage.autId).update(fields)
    }
  }
}
