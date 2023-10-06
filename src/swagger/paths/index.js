import user from './user.json';
import tag from './tag.json';
import topic from './topic.json';
import post from './post.json';

const paths = { ...user, ...tag, ...topic, ...post };

export default {
  paths,
};
