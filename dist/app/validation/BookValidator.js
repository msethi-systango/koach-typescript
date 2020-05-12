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
const RequestValidator_1 = __importDefault(require("../core/middleware/RequestValidator"));
const httpConstants_1 = __importDefault(require("../constant/httpConstants"));
class BookValidator {
    constructor() { }
    getBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                isValid: true,
                status: httpConstants_1.default.HTTP_SUCCESS_OK,
                data: {}
            };
            let bookId = parseInt(ctx.params.id);
            if (isNaN(bookId) || bookId <= 0) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please Provide valid book id';
                return response;
            }
            return response;
        });
    }
    addBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                isValid: true,
                status: httpConstants_1.default.HTTP_SUCCESS_OK,
                data: {}
            };
            let validation = RequestValidator_1.default.checkRequestBody(ctx, ['name', 'author_name', 'category', 'price', 'total_page']);
            if (validation.fail) {
                response.isValid = false,
                    response.status = httpConstants_1.default.HTTP_BAD_REQUEST;
                response.data['error'] = validation.msg;
                return response;
            }
            let name = ctx.request.body.name;
            let authorName = ctx.request.body.author_name;
            let category = ctx.request.body.category;
            let price = ctx.request.body.price;
            let totalPage = ctx.request.body.total_page;
            if (typeof name !== 'string') {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide name as a string';
                return response;
            }
            if (name.trim().length === 0 || !isNaN(Number(name))) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid name';
                return response;
            }
            if (typeof authorName !== 'string') {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide author name as a string';
                return response;
            }
            if (authorName.trim().length === 0 || !isNaN(Number(authorName))) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid author name';
                return response;
            }
            if (typeof category !== 'string') {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide category as a string';
                return response;
            }
            if (authorName.trim().length === 0 || !isNaN(Number(authorName))) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid category';
                return response;
            }
            if (isNaN(Number(price))) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide price as number';
                return response;
            }
            if (price <= 0) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid price';
                return response;
            }
            if (isNaN(Number(totalPage))) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide total page as integer';
                return response;
            }
            if (totalPage <= 0) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid total page';
                return response;
            }
            return response;
        });
    }
    updateBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                isValid: true,
                status: httpConstants_1.default.HTTP_SUCCESS_OK,
                data: {}
            };
            let bookDetails = ctx.request.body;
            if (Object.keys(bookDetails).length === 0) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide book details to update';
                return response;
            }
            if ('name' in bookDetails && (!isNaN(Number(bookDetails.name)) || typeof bookDetails.name !== 'string' || !isNaN(Number(bookDetails.name)) || bookDetails.name.trim().length === 0)) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid book name';
                return response;
            }
            if ('author_name' in bookDetails && (typeof bookDetails.author_name !== 'string' || !isNaN(Number(bookDetails.author_name)) || bookDetails.author_name.trim().length === 0)) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid author name';
                return response;
            }
            if ('category' in bookDetails && (typeof bookDetails.category !== 'string' || !isNaN(Number(bookDetails.category)) || bookDetails.category.trim().length === 0)) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid category';
                return response;
            }
            if ('total_page' in bookDetails && (isNaN(Number(bookDetails.total_page)) || bookDetails.total_page <= 0)) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid total page';
                return response;
            }
            if ('price' in bookDetails && (isNaN(Number(bookDetails.price)) || bookDetails.price <= 0)) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please provide valid price';
                return response;
            }
            return response;
        });
    }
    deleteBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                isValid: true,
                status: httpConstants_1.default.HTTP_SUCCESS_OK,
                data: {}
            };
            let bookId = parseInt(ctx.params.id);
            if (isNaN(bookId) || bookId <= 0) {
                response.isValid = false;
                response.status = httpConstants_1.default.HTTP_UNPROCESSABLE_ENTITY;
                response.data['error'] = 'Please Provide valid book id';
                return response;
            }
            return response;
        });
    }
}
exports.BookValidator = BookValidator;
const bookValidator = new BookValidator();
exports.default = bookValidator;
