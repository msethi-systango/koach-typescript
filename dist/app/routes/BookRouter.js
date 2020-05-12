"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterManager_1 = require("../core/RouterManager");
const BookController_1 = __importDefault(require("../controller/BookController"));
const bookRouterManager = new RouterManager_1.RouterManager('/books');
bookRouterManager.get('/:id', BookController_1.default.getBook);
bookRouterManager.get('/', BookController_1.default.getAllBooks);
bookRouterManager.post('/', BookController_1.default.addBook);
bookRouterManager.put('/:id', BookController_1.default.updateBook);
bookRouterManager.delete('/:id', BookController_1.default.deleteBook);
exports.default = bookRouterManager;
