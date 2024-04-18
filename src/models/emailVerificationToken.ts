import { Model, ObjectId, Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

// interface (typescript)
interface EmailVerificationTokenDocument {
  owner: ObjectId;
  otp: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

// expire them after 1 hrs

const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
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


emailVerificationTokenSchema.pre("save", async function (next) {
  // hash otp
  if (this.isModified("otp")) {
    this.otp = await hash(this.otp, 10);
  }
  next();
});

emailVerificationTokenSchema.methods.compareToken = async function (otp) {
  const result = await compare(otp, this.otp);
  return result;
};

export default model("EmailVerificationToken", emailVerificationTokenSchema) as Model<
  EmailVerificationTokenDocument,
  {},
  Methods
>;
