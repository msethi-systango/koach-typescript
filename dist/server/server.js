"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_convert_1 = __importDefault(require("koa-convert"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const ErrorMiddleware_1 = __importDefault(require("../app/core/middleware/ErrorMiddleware"));
const config_1 = __importDefault(require("../resources/config"));
const routes_1 = __importDefault(require("../app/routes"));
const app = new koa_1.default();
const options = {
    cert: fs_1.default.readFileSync(`${process.cwd()}/src/resources/cert/localhost.crt`),
    key: fs_1.default.readFileSync(`${process.cwd()}/src/resources/cert/localhost.key`),
    allowHTTP1: true
};
const _use = app.use;
app.use = (x) => _use.call(app, koa_convert_1.default(x));
app.use(koa_helmet_1.default());
app.use(koa_logger_1.default());
app.use(koa_bodyparser_1.default());
app.use(ErrorMiddleware_1.default.errorMiddleware());
app.use(koa_passport_1.default.initialize());
app.use(koa_passport_1.default.session());
require('../resources/config/passport');
routes_1.default(app);
if (['development', 'staging'].includes(config_1.default.environment)) {
    app.use(koa_mount_1.default('/swagger', koa_static_1.default(`${process.cwd()}/src/resources/swagger`)));
}
http2_1.default
    .createSecureServer(options, app.callback())
    .listen(config_1.default.port, () => {
    console.log(`Server started on ${config_1.default.port}`);
});
