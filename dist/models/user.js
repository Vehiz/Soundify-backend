"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    avatar: { type: { url: String, publicId: String } },
    tokens: { type: [String], default: [] },
    favorites: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Audio", default: [] },
    followers: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", default: [] },
    following: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", default: [] }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
