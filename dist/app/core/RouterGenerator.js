"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const koa_router_1 = __importDefault(require("koa-router"));
class RouterGenerator {
    constructor(dirPath, baseUrl) {
        this.dirPath = dirPath;
        this.baseUrl = baseUrl;
    }
    generateRoute(app) {
        glob_1.default(`${this.dirPath}/*`, { ignore: ['**/index.js', '**/index.ts'] }, (err, modules) => {
            if (err) {
                return;
            }
            modules.forEach((module) => {
                const routerManager = require(module).default;
                let router = new koa_router_1.default({ prefix: this.baseUrl });
                router.use(routerManager.getRoutes());
                app.use(router.routes());
            });
        });
    }
}
exports.default = RouterGenerator;
