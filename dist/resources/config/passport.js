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
const koa_passport_1 = __importDefault(require("koa-passport"));
const user_1 = __importDefault(require("../../app/db/entity/library/user"));
const passport_local_1 = require("passport-local");
koa_passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
koa_passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(id, '-password');
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
koa_passport_1.default.use('local', new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ $or: [{ userName: username }, { email: username }] }).where('isVerified').equals(true);
        console.log(user);
        if (!user) {
            return done(null, false);
        }
        try {
            const isMatch = yield user.validatePassword(password);
            console.log(isMatch);
            if (!isMatch) {
                return done(null, false);
            }
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }
    catch (err) {
        return done(err);
    }
})));
