"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterManager_1 = require("../core/RouterManager");
const AuthController_1 = __importDefault(require("../controller/AuthController"));
const authRouterManager = new RouterManager_1.RouterManager('/auth');
authRouterManager.post('/', AuthController_1.default.authUser);
exports.default = authRouterManager;
