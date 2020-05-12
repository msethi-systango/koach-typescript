"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
class RouterManager {
    constructor(baseUrl) {
        this.router = new koa_router_1.default({ prefix: baseUrl });
    }
    get(route, ...handlers) {
        this.router.get(route, ...handlers);
    }
    post(route, ...handlers) {
        this.router.post(route, ...handlers);
    }
    put(route, ...handlers) {
        this.router.put(route, ...handlers);
    }
    delete(route, ...handlers) {
        this.router.delete(route, ...handlers);
    }
    options(route, ...handlers) {
        this.router.options(route, ...handlers);
    }
    patch(route, ...handlers) {
        this.router.patch(route, ...handlers);
    }
    getRoutes() {
        return this.router.routes();
    }
}
exports.RouterManager = RouterManager;
