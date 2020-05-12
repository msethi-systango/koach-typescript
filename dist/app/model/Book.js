"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor() {
        this.id = 0;
        this.name = null;
        this.authorName = null;
        this.category = null;
        this.price = 0;
        this.totalPage = 0;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setAuthorName(authorName) {
        this.authorName = authorName;
    }
    setCategory(category) {
        this.category = category;
    }
    setPrice(price) {
        this.price = price;
    }
    setTotalPage(totalPage) {
        this.totalPage = totalPage;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAuthorName() {
        return this.authorName;
    }
    getCategory() {
        return this.category;
    }
    getPrice() {
        return this.price;
    }
    getTotalPage() {
        return this.totalPage;
    }
}
exports.Book = Book;
