// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    clearData (state) {
      state.data = []
    },
    pushData (state, { key, fields }) {
      const mark = {}
      mark.id = key
      mark.coords = [fields.latitude, fields.longitude]
      mark.markerIcon = {
        layout: 'default#Content',
        content: fields.title
        // contentOffset: [-65, 25],
        // contentLayout: '<div class="mark"> $[properties.iconContent] </div>'
      }
      state.data.push(mark)
    }
  },
  actions: {
    async loadData ({ commit }) {
      commit('clearData')
      const marks = (await firebase.database().ref('marks').once('value')).val()
      for (const key in marks) {
        commit('pushData', { key, fields: marks[key] })
      }
    },
    async create ({ commit }, fields) {
      fields.userId = localStorage.autId
      const newMark = await firebase.database().ref('marks').push(fields)
      commit('pushData', { key: newMark.key, fields })
      return newMark
    },
    async loadDataById ({ commit }, markId) {
      return (await firebase.database().ref('marks/' + markId).once('value')).val()
    },
    async update ({ commit }, { markId, fields }) {
      await firebase.database().ref('marks/' + markId).update(fields)
    },
    async delete ({ commit }, markId) {
      await firebase.database().ref('marks/' + markId).set(null)
    }
  }
}
