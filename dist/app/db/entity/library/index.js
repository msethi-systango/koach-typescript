"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConfigurationManager_1 = require("../../DatabaseConfigurationManager");
const config_1 = __importDefault(require("../../../../resources/config"));
let databaseConfigurationManager = new DatabaseConfigurationManager_1.DatabaseConfigurationManager(config_1.default.database);
let db = databaseConfigurationManager.loadDatabaseModels();
exports.default = db;
