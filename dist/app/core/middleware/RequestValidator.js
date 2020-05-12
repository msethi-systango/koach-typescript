"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class RequestValidator {
    constructor() { }
    checkRequestBody(ctx, requiredFields) {
        let result = { fail: false, msg: '' };
        lodash_1.default.map(requiredFields, (val) => {
            if (!lodash_1.default.has(ctx.request.body, val)) {
                result.fail = true;
                result.msg = val + ' is required.';
            }
        });
        return result;
    }
    checkRequestQuery(ctx, requiredFields) {
        let result = { fail: false, msg: '' };
        lodash_1.default.map(requiredFields, (val) => {
            if (!lodash_1.default.has(ctx.request.body, val)) {
                result.fail = true;
                result.msg = val + ' is required.';
            }
        });
        return result;
    }
}
exports.RequestValidator = RequestValidator;
let requestValidator = new RequestValidator();
exports.default = requestValidator;
