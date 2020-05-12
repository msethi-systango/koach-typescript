"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
const httpConstants_1 = __importDefault(require("../constant/httpConstants"));
const httpMessages_1 = __importDefault(require("../constant/httpMessages"));
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    constructor() { }
    createUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Controller : createUser, Request-Body : ${JSON.stringify(ctx.request.body)}`);
                yield UserService_1.default.createUser(ctx);
                ctx.status = httpConstants_1.default.HTTP_CREATED;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : createUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    emailVerify(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.emailVerify(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                ctx.body = httpMessages_1.default.EMAIL_VERIFICATION_SUCCESS;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : searchUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    searchUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield UserService_1.default.searchUser(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                ctx.body = users;
                logger_1.default.info(`Controller : searchUser, Response-Body : ${JSON.stringify(ctx.body)}`);
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : searchUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    getUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield UserService_1.default.getUser(ctx);
                ctx.body = user;
                logger_1.default.info(`Controller : getUser, Response-Body : ${JSON.stringify(ctx.body)}`);
                logger_1.default.info(`Request-Params : ${JSON.stringify(ctx.params)}`);
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : getUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    updateUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.updateUser(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : getUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    deleteUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.deleteUser(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                ctx.body = httpMessages_1.default.DELETE_SUCCESS;
                logger_1.default.info(`Controller : deleteUser, Request-Params : ${JSON.stringify(ctx.params)}`);
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : deleteUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    forgetPassword(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.forgetPassword(ctx);
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : forgetPassword, Error : ${JSON.stringify(err)}`);
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
