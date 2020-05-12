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
const user_1 = __importDefault(require("../db/entity/library/user"));
const userVerify_1 = __importDefault(require("../db/entity/library/userVerify"));
const User_1 = require("../model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpConstants_1 = __importDefault(require("../constant/httpConstants"));
const httpMessages_1 = __importDefault(require("../constant/httpMessages"));
const lodash_1 = __importDefault(require("lodash"));
const crypto_1 = __importDefault(require("crypto"));
const generate_password_1 = __importDefault(require("generate-password"));
const email_1 = require("../utils/email");
class UserService {
    constructor() { }
    createUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let firstName = ctx.request.body.firstName;
            let lastName = ctx.request.body.lastName;
            let userName = ctx.request.body.userName;
            let email = ctx.request.body.email;
            let password = ctx.request.body.password;
            let user = new user_1.default({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            });
            yield user.save();
            let randamToken = crypto_1.default.randomBytes(16).toString('hex');
            const userVerifyDetail = {
                userId: user._id,
                verifyToken: randamToken
            };
            const userVerify = new userVerify_1.default(userVerifyDetail);
            yield userVerify.save();
            let mailtoken = jsonwebtoken_1.default.sign(userVerifyDetail, 'emailtoken');
            let from = 'systangoproject@gmail.com';
            let to = ctx.request.body.email;
            let subject = 'Please confirm your Email account';
            let link = 'https://localhost:3000/api/v1/users/_verify?userVerify=' + mailtoken;
            let html = "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>";
            let result = yield new email_1.SendMail().sendMail(from, to, subject, html);
            if (!result) {
                ctx.status = httpConstants_1.default.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
                ctx.body = httpMessages_1.default.EMAIL_VERIFICATION_SEND_FAIL;
            }
        });
    }
    emailVerify(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = ctx.request.query.userVerify;
            let getToken = jsonwebtoken_1.default.verify(token, 'emailtoken');
            const userId = getToken.userId;
            const verifyToken = getToken.verifyToken;
            const checkUserVerify = yield user_1.default.findOne({ _id: userId, isVerified: true });
            if (checkUserVerify) {
                ctx.body = httpMessages_1.default.VALIDATE_SUCCESS;
                ctx.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                return;
            }
            const tokenVerify = yield userVerify_1.default.findOne({ verifyToken: verifyToken, userId: userId });
            if (!tokenVerify) {
                ctx.body = httpMessages_1.default.EMAIL_TOKEN_VALIDATE;
                ctx.status = httpConstants_1.default.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
                return;
            }
            yield user_1.default.findOneAndUpdate({ _id: userId }, {
                $set: {
                    isVerified: true
                }
            });
        });
    }
    searchUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = parseInt(ctx.request.query.limit) || 1;
            const page = parseInt(ctx.request.query.page) || 1;
            const name = ctx.request.query.name;
            console.log(name);
            if (!name) {
                ctx.body = httpMessages_1.default.NOTHING_SEARCHED;
                ctx.status = httpConstants_1.default.HTTP_BAD_REQUEST;
                return;
            }
            let userSearch;
            if (/\s/.test(name)) {
                const namedata = name.trim().split(/\s+/);
                const firstName = namedata[0];
                const lastName = namedata[1];
                userSearch = yield user_1.default.find({ $or: [{ firstName: { $regex: new RegExp(firstName, 'i') } },
                        { lastName: { $regex: new RegExp(lastName, 'i') } }] });
            }
            else {
                let searchFirstname = yield user_1.default.find({ firstName: { $regex: new RegExp(name, 'i') } });
                let searchLastname = yield user_1.default.find({ lastName: { $regex: new RegExp(name, 'i') } });
                const all = lodash_1.default.concat(searchFirstname, searchLastname);
                userSearch = lodash_1.default(all).drop((page - 1) * limit).take(limit);
            }
            console.log(userSearch);
            let users = new Array();
            for (let search of userSearch) {
                let user = new User_1.UserModel();
                user.setId(search.id);
                user.setFirstName(search.firstName);
                users.push(user);
            }
            console.log(users);
            return users;
        });
    }
    getUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.params.user_id;
            const getUserData = yield user_1.default.findOne({ _id: userId });
            if (!getUserData) {
                ctx.body = httpMessages_1.default.USER_NOT_FOUND;
                ctx.status = httpConstants_1.default.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
                return;
            }
            let user = new User_1.UserModel();
            if (getUserData) {
                user.setId(getUserData.id);
                user.setFirstName(getUserData.firstName);
                user.setLastName(getUserData.lastName);
                user.setUserName(getUserData.userName);
                user.setBio(getUserData.bio);
                user.setProfilePicUrl(getUserData.profilePicUrl);
                user.setEmail(getUserData.email);
            }
            return user;
        });
    }
    updateUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = ctx.request.body;
            const firstName = user.firstName.trim();
            const lastName = user.lastName.trim();
            const bio = user.bio.trim();
            const userName = user.userName.trim();
            const userdata = yield user_1.default.findByIdAndUpdate(user._id, {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    bio: bio
                }
            });
        });
    }
    deleteUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.params.user_id;
            const logedInUser = ctx.state.user._id;
            const deleteCheck = true;
            if (!deleteCheck) {
                ctx.body = httpMessages_1.default.CAN_NOT_DELETE;
                return;
            }
            yield user_1.default.findOneAndRemove({ _id: userId });
        });
    }
    forgetPassword(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = ctx.request.body.email;
            let userData = yield user_1.default.findOne({ email: email });
            if (userData) {
                let password = generate_password_1.default.generate({
                    length: 10,
                    numbers: true
                });
                userData.password = password;
                yield userData.save();
                let from = 'systangoproject@gmail.com';
                let to = email;
                let subject = 'Forgot Password';
                let html = 'Your new password for your account is: ' + password;
                let result = new email_1.SendMail().sendMail(from, to, subject, html);
                if (result) {
                    ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                    return;
                }
                else {
                    ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                    ctx.body = httpMessages_1.default.PASSWORD_CHANGED_MAIL_NOT_SEND;
                    return;
                }
            }
            else {
                ctx.status = httpConstants_1.default.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
                ctx.body = httpMessages_1.default.USER_NOT_FOUND;
                return;
            }
        });
    }
}
let userService = new UserService();
exports.default = userService;
