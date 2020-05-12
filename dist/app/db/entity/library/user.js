"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../../resources/config"));
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicUrl: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });
UserSchema.pre('save', function preSave(next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        let salt = bcryptjs_1.default.genSaltSync(10);
        var hash = bcryptjs_1.default.hashSync(user.password, salt);
        user.password = hash;
        next(null);
    }
    catch (error) {
        next(error);
    }
});
UserSchema.methods.validatePassword = function validatePassword(password) {
    const user = this;
    return new Promise((resolve, reject) => {
        try {
            let isMatch = bcryptjs_1.default.compareSync(password, user.password);
            resolve(isMatch);
        }
        catch (error) {
            console.log('error');
            resolve(false);
        }
    });
};
UserSchema.methods.generateToken = function generateToken() {
    const user = this;
    return jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.default.token);
};
exports.default = mongoose_1.default.model('User', UserSchema);
