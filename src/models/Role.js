import { Schema, model } from 'mongoose';
import { STATUS } from '@/config/constants';

const Role = new Schema(
  {
    level: { type: Number, require: true, unique: true, alias: '_id' },
    name: { type: String },
    status: {
      type: Number,
      enum: Object.values(STATUS),
      default: STATUS.ENABLE,
    },
  },
  {
    timestamps: true,
  }
);

export default model('role', Role);
