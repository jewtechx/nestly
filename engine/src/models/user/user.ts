import { Schema, model, CallbackError } from 'mongoose';
import { IUserDocument } from '../../types/user/user';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['OWNER', 'AGENT', 'RENTER'], required: true },
  verificationCode: { type: String, required: true, default: () => v4() },
  passwordResetCode: { type: String, required: false },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.validatePassword = async (password:string) => {
  return bcrypt.compare(this.password,password)
};

const User = model('User', userSchema);

export default User;
