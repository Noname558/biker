export default class User {
  constructor (
    username, email = null, password = null, city = null
  ) {
    this.username = username
    this.email = email
    this.password = password
    this.city = city
  }
}
