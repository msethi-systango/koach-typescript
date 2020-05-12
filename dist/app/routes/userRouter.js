"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterManager_1 = require("../core/RouterManager");
const UserController_1 = __importDefault(require("../controller/UserController"));
const userRouterManager = new RouterManager_1.RouterManager('/users');
userRouterManager.post('/', UserController_1.default.createUser);
userRouterManager.patch('/_verify', UserController_1.default.emailVerify);
userRouterManager.get('/', UserController_1.default.searchUser);
userRouterManager.get('/:user_id', UserController_1.default.getUser);
userRouterManager.put('/', UserController_1.default.updateUser);
userRouterManager.delete('/:user_id', UserController_1.default.deleteUser);
userRouterManager.patch('/_forget-password', UserController_1.default.forgetPassword);
exports.default = userRouterManager;
