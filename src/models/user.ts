import { Model, ObjectId, Schema, model } from "mongoose";

interface UserDocument{
    name: string;
    email: string;
    password: string;
    verified: boolean;
    avatar?: {url: string, publicId: string};
    tokens: string[];
    favorites: ObjectId[];
    followers: ObjectId[];
    following: ObjectId[];
}

const userSchema = new Schema<UserDocument>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false},
    avatar: {type: {url: String, publicId: String}},
    tokens: {type: [String], default: []},
    favorites: {type: [Schema.Types.ObjectId], ref: "Audio", default: []},
    followers: {type: [Schema.Types.ObjectId], ref: "User", default: []},
    following: {type: [Schema.Types.ObjectId], ref: "User", default: []}
}, {timestamps: true});

export default model("User", userSchema) as Model<UserDocument>;