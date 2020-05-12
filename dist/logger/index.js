"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogManager_1 = require("./LogManager");
let logManager = new LogManager_1.LogManager('log', 'YYYY-MM-DD', process.env.NODE_ENV);
let logger = logManager.getLogger();
exports.default = logger;
