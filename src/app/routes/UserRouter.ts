import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'

const userRouterManager: RouterManager = new RouterManager('/users')

userRouterManager.post('/', userController.createUser)

userRouterManager.patch('/_verify', userController.emailVerify)

userRouterManager.get('/', userController.searchUser)

userRouterManager.get('/:user_id', userController.getUser)

userRouterManager.put('/', userController.updateUser)

userRouterManager.delete('/:user_id', userController.deleteUser)

userRouterManager.patch('/_forget-password', userController.forgetPassword)

export default userRouterManager