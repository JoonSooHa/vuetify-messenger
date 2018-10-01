import store from './index'

export default function getUserState () {
  return new Promise((resolve, reject) => {
    if (store.getters.user) {
      resolve(store.getters.user)
    } else {
      const unwatch = store.watch(() => store.getters.user, value => {
        unwatch()
        resolve(value)
      })
    }
  })
}
