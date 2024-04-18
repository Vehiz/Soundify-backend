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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
// expire them after 1 hrs
const emailVerificationTokenSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600, // 60 min * 60 sec = 3600s
        default: Date.now(),
    },
});
emailVerificationTokenSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hash otp
        if (this.isModified("otp")) {
            this.otp = yield (0, bcrypt_1.hash)(this.otp, 10);
        }
        next();
    });
});
emailVerificationTokenSchema.methods.compareToken = function (otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, bcrypt_1.compare)(otp, this.otp);
        return result;
    });
};
exports.default = (0, mongoose_1.model)("EmailVerificationToken", emailVerificationTokenSchema);
