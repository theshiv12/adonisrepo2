
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.post('/register' ,'AuthController.registration')
Route.post('/login' ,'AuthController.login')


