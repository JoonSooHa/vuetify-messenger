import getUserState from '../store/getUserState'

export default async function (to, from, next) {
  const user = await getUserState()
  if (user) {
    next()
  } else {
    next('/login')
  }
}
