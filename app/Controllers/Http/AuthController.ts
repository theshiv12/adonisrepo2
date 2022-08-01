import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'
import Event from '@ioc:Adonis/Core/Event'
import userValid from 'App/Validators/CreateUserValidator'
 
export default class AuthController {
    //registration function
    public async register({request}:HttpContextContract){
    const data  = await request.validate(userValid)
    const newUser = await User.create(data)
    Event.emit('new:user', {
      newUser,
    })

    Event.emit('new::user', newUser)
    return newUser

    }

    //login function
    public async login({request ,auth , response}:HttpContextContract){
     
        const email = request.input('email')
        const password = request.input('password')

  try {
     const token = await auth.attempt(email, password)
     return token.toJSON()
  } catch {
    return response.unauthorized('Invalid credentials')
  }

     
    }
   //auth logout
    public async logout({ auth, response }: HttpContextContract) {
      await auth.logout()
      return response.status(200)
    }
}



