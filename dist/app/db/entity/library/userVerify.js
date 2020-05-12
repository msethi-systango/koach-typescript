"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VerifyUserSchema = new mongoose_1.Schema({
    verifyToken: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    expireIn: { type: Date, default: Date.now, expires: '24h' }
}, { timestamps: true });
exports.default = mongoose_1.default.model('VerifyUser', VerifyUserSchema);
