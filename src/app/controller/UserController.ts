import { Context } from 'koa'
import logger from '../../logger'
import httpConstant from '../constant/httpConstants'
import httpMessage from '../constant/httpMessages'
import userService from '../service/UserService'
import { UserModel } from '../model/User'
import httpConstants from '../constant/httpConstants'

class UserController {
    constructor() { }
    async createUser(ctx: Context) {
        try {
            // let validation = await bookValidator.addBook(ctx)
            // if (!validation.isValid) {
            //     ctx.status = validation.status
            //     ctx.body = validation.data
            //     return
            // }
            logger.info(`Controller : createUser, Request-Body : ${JSON.stringify(ctx.request.body)}`)
            // adding the book
            await userService.createUser(ctx)
            ctx.status = httpConstant.HTTP_CREATED
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : createUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async emailVerify(ctx: Context) {
        try {
            await userService.emailVerify(ctx)
            ctx.status = httpConstant.HTTP_SUCCESS_OK
            ctx.body = httpMessage.EMAIL_VERIFICATION_SUCCESS
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : searchUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async searchUser(ctx: Context) {
        try { 
            let users: Array<UserModel> = await userService.searchUser(ctx)
            ctx.status = httpConstant.HTTP_SUCCESS_OK
            ctx.body = users
            logger.info(`Controller : searchUser, Response-Body : ${JSON.stringify(ctx.body)}`)
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : searchUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async getUser(ctx: Context) {
        try {
            // let user: any = await userService.getUser(ctx)
            // let user: UserModel = new UserModel()
            let user = await userService.getUser(ctx)
            ctx.body = user
            logger.info(`Controller : getUser, Response-Body : ${JSON.stringify(ctx.body)}`)
            logger.info(`Request-Params : ${JSON.stringify(ctx.params)}`)
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : getUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async updateUser(ctx: Context) {
        try  {
            await userService.updateUser(ctx)
            ctx.status = httpConstant.HTTP_SUCCESS_OK
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : getUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async deleteUser(ctx: Context) {
        try {
            await userService.deleteUser(ctx)
            ctx.status = httpConstant.HTTP_SUCCESS_OK
            ctx.body = httpMessage.DELETE_SUCCESS
            logger.info(`Controller : deleteUser, Request-Params : ${JSON.stringify(ctx.params)}`)
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : deleteUser, Error : ${JSON.stringify(err)}`)
        }
    }
    async forgetPassword(ctx: Context) {
        try {
            await userService.forgetPassword(ctx)
        } catch (err) {
            ctx.status = httpConstant.HTTP_INTERNAL_SERVER_ERROR
            ctx.body = { error: err.message }
            logger.error(`Controller : forgetPassword, Error : ${JSON.stringify(err)}`)
        }
    }
}
const userController: UserController = new UserController()
export default userController 
