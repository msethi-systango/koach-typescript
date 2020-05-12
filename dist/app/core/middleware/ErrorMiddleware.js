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
const jsonwebtoken_1 = require("jsonwebtoken");
const httpConstants_1 = __importDefault(require("../../constant/httpConstants"));
const library_1 = __importDefault(require("../../db/entity/library"));
class ErrorMiddleware {
    getToken(ctx) {
        const header = ctx.request.headers.authorization;
        if (!header) {
            return null;
        }
        const parts = header.split(' ');
        if (parts.length !== 2) {
            return null;
        }
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
            return token;
        }
        return null;
    }
    errorMiddleware() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield next();
            }
            catch (err) {
                ctx.status = err.status || 500;
                ctx.body = err.message;
                ctx.app.emit('error', err, ctx);
            }
        });
    }
    jwtMiddleWare() {
        return __awaiter(this, void 0, void 0, function* () {
            let getToken = this.getToken;
            return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                const token = getToken(ctx);
                if (!token) {
                    ctx.status = httpConstants_1.default.HTTP_UNAUTHORISED;
                    ctx.body = { error: { code: 'GEN-UNAUTHORIZED', http_code: 401 } };
                    return;
                }
                let decoded = null;
                try {
                    decoded = jsonwebtoken_1.decode(token);
                    ctx.state.user = decoded;
                    if (decoded.exp < Math.floor(Date.now() / 1000)) {
                        ctx.status = httpConstants_1.default.HTTP_UNAUTHORISED;
                        ctx.body = { error: { code: 'GEN-UNAUTHORIZED', http_code: 401 } };
                        return;
                    }
                    let sqlQuery = 'SELECT * FROM `Users` where user_id = :userId and d2t_token = :tokenId';
                    yield library_1.default.sequelize.query(sqlQuery, { replacements: { userId: decoded.user_id, tokenId: decoded.token_id }, type: library_1.default.sequelize.QueryTypes.SELECT })
                        .then(users => {
                        if (users.length === 0) {
                            throw new Error();
                        }
                    }, reason => {
                        let error = new Error();
                        throw error;
                    });
                    ctx.state.user = decoded;
                    if (!ctx.state.user) {
                        throw new Error();
                    }
                    return next();
                }
                catch (err) {
                    ctx.status = httpConstants_1.default.HTTP_UNAUTHORISED;
                    ctx.body = { error: { code: 'GEN-UNAUTHORIZED', http_code: 401 } };
                }
            });
        });
    }
}
const errorMiddleware = new ErrorMiddleware();
exports.default = errorMiddleware;
