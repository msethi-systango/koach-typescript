"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseConfigurationManager {
    constructor(modelDirPath) {
        this.modelDirPath = modelDirPath;
    }
    loadDatabaseModels() {
        mongoose_1.default.connect(this.modelDirPath);
        console.log('Connected');
        return;
    }
}
exports.DatabaseConfigurationManager = DatabaseConfigurationManager;
