"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = __importDefault(require("../entity/library"));
class BookRepository extends library_1.default.Book {
    constructor() {
        super();
    }
    getBookByCategory(category) {
        return this.findAll({
            where: {
                category: category
            }
        });
    }
    getBookSortByName(isDesc) {
        let order = (isDesc) ? 'DESC' : 'ASC';
        return this.findAll({
            order: [
                ['name', order]
            ]
        });
    }
}
exports.BookRepository = BookRepository;
const bookRepository = new BookRepository();
exports.default = bookRepository;
