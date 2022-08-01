
import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
    Route.get('/viewprofile' , 'ProfilesController.viewProfile')
    Route.post('/Addprofile' , 'ProfilesController.createProfile')
    Route.patch('/updateprofile/:id' , 'ProfilesController.updateProfile')
    Route.delete('/delProfile' , 'ProfilesController.delProfile')
  }).middleware("auth").prefix('/user')
Route.post('/register' ,"AuthController.register")
Route.post('/login' ,"AuthController.login")
