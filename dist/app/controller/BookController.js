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
const logger_1 = __importDefault(require("../../logger"));
const httpConstants_1 = __importDefault(require("../constant/httpConstants"));
const BookService_1 = __importDefault(require("../service/BookService"));
const BookValidator_1 = __importDefault(require("../validation/BookValidator"));
class BookController {
    constructor() { }
    getBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield BookValidator_1.default.getBook(ctx);
                if (!validation.isValid) {
                    ctx.status = validation.status;
                    ctx.body = validation.data;
                    return;
                }
                logger_1.default.info(`Controller : getBook, Request-Body : ${JSON.stringify(ctx.params)}`);
                let book = yield BookService_1.default.getBook(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                ctx.body = book;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : getBook, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    getAllBooks(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let books = yield BookService_1.default.getAllBooks(ctx);
                ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                ctx.body = books;
                logger_1.default.info(`Controller : getAllBooks, Response-Body : ${JSON.stringify(ctx.body)}`);
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : getAllBooks, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    addBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield BookValidator_1.default.addBook(ctx);
                if (!validation.isValid) {
                    ctx.status = validation.status;
                    ctx.body = validation.data;
                    return;
                }
                logger_1.default.info(`Controller : addBook, Request-Body : ${JSON.stringify(ctx.request.body)}`);
                yield BookService_1.default.addBook(ctx);
                ctx.status = httpConstants_1.default.HTTP_CREATED;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : addBook, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    updateBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield BookValidator_1.default.updateBook(ctx);
                if (!validation.isValid) {
                    ctx.status = validation.status;
                    ctx.body = validation.data;
                    return;
                }
                logger_1.default.info(`Controller : updateBook, Request-Body : ${JSON.stringify(ctx.request.body)}`);
                logger_1.default.info(`Request-Params : ${JSON.stringify(ctx.params)}`);
                let updatedCount = yield BookService_1.default.updateBook(ctx);
                if (!updatedCount) {
                    ctx.status = httpConstants_1.default.HTTP_CONFLICT;
                    ctx.body = { error: 'book does not exist.' };
                }
                else {
                    ctx.status = httpConstants_1.default.HTTP_SUCCESS_OK;
                }
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : updateBook, Error : ${JSON.stringify(err)}`);
            }
        });
    }
    deleteBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield BookValidator_1.default.deleteBook(ctx);
                if (!validation.isValid) {
                    ctx.status = validation.status;
                    ctx.body = validation.data;
                    return;
                }
                logger_1.default.info(`Controller : deleteBook, Request-Body : ${JSON.stringify(ctx.request.body)}`);
                logger_1.default.info(`Request-Params : ${JSON.stringify(ctx.params)}`);
                yield BookService_1.default.deleteBook(ctx);
                ctx.status = httpConstants_1.default.HTTP_NO_CONTENT;
            }
            catch (err) {
                ctx.status = httpConstants_1.default.HTTP_INTERNAL_SERVER_ERROR;
                ctx.body = { error: err.message };
                logger_1.default.error(`Controller : deleteBook, Error : ${JSON.stringify(err)}`);
            }
        });
    }
}
const bookController = new BookController();
exports.default = bookController;
