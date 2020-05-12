"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const fs_1 = __importDefault(require("fs"));
class LogManager {
    constructor(logDir, datePattern, env) {
        this.logDir = logDir;
        this.datePattern = datePattern;
        this.env = env;
        if (!fs_1.default.existsSync(this.logDir)) {
            fs_1.default.mkdirSync(this.logDir);
        }
        this.logger = winston_1.default.createLogger({
            transports: [
                new (winston_1.default.transports.Console)({
                    level: 'info'
                }),
                new (require('winston-daily-rotate-file'))({
                    filename: `${this.logDir}/logs`,
                    timestamp: this.tsFormat(),
                    datePattern: this.datePattern,
                    prepend: true,
                    level: this.env === 'development' ? 'verbose' : 'info',
                    maxFiles: '30d',
                    zippedArchive: true
                })
            ]
        });
    }
    tsFormat() {
        return (new Date()).toLocaleDateString();
    }
    getLogger() {
        return this.logger;
    }
}
exports.LogManager = LogManager;
