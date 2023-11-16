import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TYPE, GENDER, STATUS } from '@/config/constants';
import { TOKEN_EXPIRE, TOKEN_SECRET } from '@/config/env';
import ApiError from '@/utils/ApiError';

const User = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 4,
      text: true,
    },
    password: {
      type: String,
      trim: true,
      min: 4,
    },
    fullName: {
      type: String,
      text: true,
    },
    birthday: Date,
    avatar: String,
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
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
      default: STATUS.ENABLE,
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
    { expiresIn: TOKEN_EXPIRE }
  );
};

User.methods.isValidPassword = async function (hashPassword) {
  try {
    return await bcrypt.compare(hashPassword, this.password);
  } catch (error) {
    throw new ApiError(error.message);
  }
};

User.methods.toResource = function () {
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
  };
};

export default model('user', User);
