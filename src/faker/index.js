// import { USERS } from './User';
import { POSTS } from './Post';
import Post from '@/models/Post';
// import User from '@/models/User';
import '@/config/discord';

export default async (isFaker) => {
  if (isFaker) {
    // await User.insertMany(USERS);
    await Post.insertMany(POSTS);
  }
};
