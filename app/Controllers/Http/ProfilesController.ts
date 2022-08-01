import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile";
import { schema } from '@ioc:Adonis/Core/Validator'


export default class ProfilesController {
  //view own profile
    public async viewProfile({auth , response }){
     try{
      let profile = await Profile.findBy('id',auth.user.id)
      if(profile){
      return response.json({
          success:true,profile
      })
    }
    else{
         return  response.json({
          success:false,
          message:"profile deleted or not created"
      })
    }
    }catch{
      return response.status(500).json({
          success:false 
      })
    }
    }
   
    //delete own profile
    public async delProfile({auth , response }){
      try{
        let profile = await Profile.findBy('id',auth.user.id)
         await profile?.delete();
       return response.status(204).json({
            message:"deleted"
          })
    }catch{
      return response.status(404).json({
        message:"profile deleted"
      })
    }
      
    }
   
   
    //crete an profile
    public async createProfile({request , response}: HttpContextContract){
      const validate = 
      {schema:schema.create({
          name: schema.string(),
            gender: schema.string()
      }),
      messages: {
        required: 'The {{ field }} is required to create a new account',
        'name.unique': 'name not available'
      }
    } 
       const data = await request.validate(validate)
        await Profile.create(data)
       response.status(201).send("created")
    }
   
   //update an profile
  public async updateProfile({request , response , params}: HttpContextContract){
      try{ 
        const profile = await Profile.findOrFail(params.id)
     if(request.input('name'))
       profile.name=request.input('name')
     if(request.input('gender') )  
       profile.gender=request.input('gender') 
     if(request.input('dob') )
        profile.dob = request.input('dob') 
     await profile.save()
     return  response.status(202).send("updated")
       
    }catch(error)
    {
        return  response.status(500).json({
            message:error
        })
    }
}


    
}