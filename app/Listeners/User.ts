import { EventsList } from '@ioc:Adonis/Core/Event'

export default class User {
  public async onNewUser(user){
    console.log(user)
  }
}