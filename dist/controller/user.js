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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.create = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("../models/user"));
const variables_1 = require("../utils/variables");
const emailVerificationToken_1 = __importDefault(require("../models/emailVerificationToken"));
const helper_1 = require("../utils/helper");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_1.default.create({ name, email, password });
    //Send verification email
    const transport = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: variables_1.MAILTRAP_USER,
            pass: variables_1.MAILTRAP_PASS,
        },
    });
    const otp = (0, helper_1.generateOtp)(6);
    yield emailVerificationToken_1.default.create({
        owner: user._id,
        otp,
    });
    transport.sendMail({
        to: user.email,
        from: "VictorEhiz@soundify.app",
        html: `<h1> Hello ${user.name}, your verification token is ${otp}</h1>`,
    });
    res.status(201).json({
        message: "user created successfully",
        user,
    });
});
exports.create = create;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, userId } = req.body;
    const verificationOtp = yield emailVerificationToken_1.default.findOne({
        owner: userId
    });
    if (!verificationOtp)
        return res.status(403).json({
            error: "Invalid token!"
        });
    const matched = yield verificationOtp.compareToken(otp);
    if (!matched)
        return res.status(403).json({
            error: "Invalid token!"
        });
    yield user_1.default.findByIdAndUpdate(userId, { verified: true });
    yield emailVerificationToken_1.default.findByIdAndDelete(verificationOtp._id);
    res.json({ message: "Your email is verified" });
});
exports.verifyEmail = verifyEmail;
