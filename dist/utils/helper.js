"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
};
exports.generateOtp = generateOtp;
