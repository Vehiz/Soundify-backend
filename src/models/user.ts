import { compare, hash } from "bcrypt";
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
interface Methods {
    comparePassword(password: string): Promise<boolean>;
  }

const userSchema = new Schema<UserDocument, {}, Methods>({
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

userSchema.pre("save", async function (next) {
    // hash otp
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password);
    return result;
  };
export default model("User", userSchema) as Model<UserDocument, {}, Methods>;