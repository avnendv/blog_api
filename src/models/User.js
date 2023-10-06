import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TYPE, GENDER, STATUS } from '@/config/constants';
import { TOKEN_SECRET } from '@/config/env';

const User = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
      min: 4,
    },
    password: {
      type: String,
      trim: true,
      min: 4,
    },
    fullName: {
      type: String,
      required: true,
    },
    birthday: Date,
    avatar: String,
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: Number,
      enum: Object.values(GENDER),
    },
    address: String,
    facebookId: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    authType: {
      type: String,
      enum: Object.values(AUTH_TYPE),
      default: AUTH_TYPE.LOCAL,
    },
    status: {
      type: Number,
      enum: Object.values(STATUS),
      default: 1,
    },
    role: {
      type: String,
      ref: 'role',
    },
  },
  {
    timestamps: true,
  }
);

User.pre('save', async function (next) {
  try {
    if (this.authType !== 'local') next();

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt);
    // Re-assign password hashed
    this.password = passwordHashed;

    next();
  } catch (error) {
    next(error);
  }
});

User.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    TOKEN_SECRET,
    { expiresIn: '24h' }
  );
};

User.methods.isValidPassword = async function (hashPassword) {
  try {
    return await bcrypt.compare(hashPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

User.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    userName: this.userName,
    email: this.email,
    phone: this.phone,
    gender: this.gender,
    birthday: this.birthday,
    fullName: this.fullName,
    avatar: this.avatar,
    address: this.address,
    token: this.generateJWT(),
  };
};

export default model('user', User);
