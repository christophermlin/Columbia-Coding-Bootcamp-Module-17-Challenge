import { Schema, model, Types, Document } from 'mongoose';

// Reaction Schema (subdocument only)
export interface Reaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<Reaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    toJSON: {
      getters: true,
      transform: (_doc, ret) => {
        if (ret.createdAt) {
          const date = ret.createdAt instanceof Date ? ret.createdAt : new Date(ret.createdAt);
          ret.createdAt = date.toLocaleString();
        }
        return ret;
      },
    },
  }
);

export interface ThoughtDocument extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Reaction[];
  reactionCount?: number;
}

const thoughtSchema = new Schema<ThoughtDocument>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (_doc, ret) => {
        if (ret.createdAt) {
          const date = ret.createdAt instanceof Date ? ret.createdAt : new Date(ret.createdAt);
          ret.createdAt = date.toLocaleString();
        }
        return ret;
      },
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (this: ThoughtDocument) {
  return this.reactions.length;
});

export const Thought = model<ThoughtDocument>('Thought', thoughtSchema);

export interface UserDocument extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function (this: UserDocument) {
  return this.friends.length;
});

export const User = model<UserDocument>('User', userSchema);
