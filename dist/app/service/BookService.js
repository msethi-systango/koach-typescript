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
const library_1 = __importDefault(require("../db/entity/library"));
const Book_1 = require("../model/Book");
class BookService {
    constructor() { }
    getBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookId = parseInt(ctx.params.id);
            let bookModel = yield library_1.default.Book.findByPk(bookId);
            let book = new Book_1.Book();
            if (bookModel) {
                book.setId(bookModel.id);
                book.setName(bookModel.name);
                book.setAuthorName(bookModel.author_name);
                book.setCategory(bookModel.category);
                book.setPrice(bookModel.price);
                book.setTotalPage(bookModel.total_page);
            }
            return book;
        });
    }
    getAllBooks(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookModels = yield library_1.default.Book.findAll();
            let books = new Array();
            for (let bookModel of bookModels) {
                let book = new Book_1.Book();
                book.setId(bookModel.id);
                book.setName(bookModel.name);
                book.setAuthorName(bookModel.author_name);
                book.setCategory(bookModel.category);
                book.setPrice(bookModel.price);
                book.setTotalPage(bookModel.total_page);
                books.push(book);
            }
            return books;
        });
    }
    addBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = ctx.request.body.name;
            let authorName = ctx.request.body.authorName;
            let category = ctx.request.body.category;
            let price = ctx.request.body.price;
            let totalPage = ctx.request.body.totalPage;
            yield library_1.default.Book.create({
                name: name,
                author_name: authorName,
                category: category,
                price: price,
                total_page: totalPage
            });
        });
    }
    updateBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookId = parseInt(ctx.params.id);
            let bookDetials = ctx.request.body;
            let updateData = yield library_1.default.Book.update(bookDetials, {
                where: {
                    id: bookId
                }
            });
            return updateData[0];
        });
    }
    deleteBook(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookId = parseInt(ctx.params.id);
            let book = yield library_1.default.Book.destroy({
                where: {
                    id: bookId
                }
            });
        });
    }
}
let bookService = new BookService();
exports.default = bookService;
