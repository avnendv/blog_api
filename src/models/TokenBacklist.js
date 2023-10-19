import { Schema, model } from 'mongoose';
import { TOKEN_EXPIRE } from '@/config/env';

const TokenBacklist = new Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: TOKEN_EXPIRE },
    },
  },
  {
    timestamps: true,
  }
);

export default model('tokenBacklist', TokenBacklist);
