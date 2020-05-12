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
const AuthService_1 = __importDefault(require("../service/AuthService"));
const logger_1 = __importDefault(require("../../logger"));
const httpConstants_1 = __importDefault(require("../constant/httpConstants"));
class AuthController {
    constructor() { }
    authUser(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthService_1.default.authUser(ctx, next);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : loginUser, Error : ${JSON.stringify(err)}`);
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
