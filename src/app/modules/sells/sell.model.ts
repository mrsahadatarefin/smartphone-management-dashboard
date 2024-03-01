import { Schema, model } from 'mongoose';
import { TSell } from './sell.interface';

const sellSchema = new Schema<TSell>(
  {
    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const SellModel = model<TSell>('Sell', sellSchema);
