module.exports = {
  namespace: 'example',
  state: {
    count: 0,
  },
  mutations: {
    update(state) {
      state.count += 1
    }
  }
}
