import { faker } from '@faker-js/faker';
import { calculateReadingTime, slugify } from '@/utils';

export function createRandomPost() {
  const title = faker.internet.displayName();
  const content = faker.lorem.lines({ min: 15, max: 150 });
  return {
    title,
    slug: slugify(title),
    thumbnail: faker.image.url(),
    description: faker.lorem.paragraph(2),
    content,
    topic: [
      '654de5d79ec9e55794ddb518',
      '654de5f29ec9e55794ddb524',
      '654de6009ec9e55794ddb530',
      '654de63f9ec9e55794ddb53c',
      '654de6499ec9e55794ddb548',
    ][Math.floor(Math.random() * 5)],
    tag: [['Fontend', 'ReactJS'], ['Javascript', 'Fontend', 'ReactJS'], ['Javascript'], ['ReactJS']][
      Math.floor(Math.random() * 3)
    ],
    isShowTop: [false, true][Math.floor(Math.random() * 2)],
    isApproved: [false, true][Math.floor(Math.random() * 2)],
    status: 1,
    publish: 1,
    author: [
      '6549d945e0215157dea2b5d0',
      '654debf6cfb8235529217c9c',
      '654debf6cfb8235529217c9d',
      '654debf6cfb8235529217c9e',
      '654debf6cfb8235529217c9f',
    ][Math.floor(Math.random() * 5)],
    minRead: calculateReadingTime(content),
  };
}

export const POSTS = faker.helpers.multiple(createRandomPost, {
  count: 150,
});
