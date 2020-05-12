"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterGenerator_1 = __importDefault(require("../core/RouterGenerator"));
const config_1 = __importDefault(require("../../resources/config"));
exports.default = (app) => {
    const dirPath = __dirname;
    let baseUrl = config_1.default.baseUrl;
    const routerGenerator = new RouterGenerator_1.default(dirPath, baseUrl);
    routerGenerator.generateRoute(app);
};
