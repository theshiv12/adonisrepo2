import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema } from '@ioc:Adonis/Core/Validator'
 import User from 'App/Models/User'
 import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async registration({request , auth}:HttpContextContract){
   
    const newUserSchema = schema.create({
        email: schema.string()
      })
    const data = await request.validate({schema:newUserSchema})
    const user = await User.create(data)
    await auth.login(user)
    return await Database
    .query()  
    .from('users')
    .select('*')
    
  }

  public async login({request , response ,auth , session}:HttpContextContract){
    const {email , password } = request.only(['email' , 'password'])
    try {
        await auth.attempt(email,password)
    } catch (error) {
       session.flash('form' , 'your username or password incorret')
         return response
    } 
    return response.redirect("/")
  }
}



