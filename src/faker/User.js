import { faker } from '@faker-js/faker';

const defaultUser = {
  email: 'avnendv@gmail.com',
  userName: 'AVNENDV',
  fullName: 'AVNENDV',
  password: '123456',
  birthday: '2000/11/16',
  gender: 1,
  phone: '0124334124',
  address: 'Nam Định',
  avatar: faker.image.avatar(),
  bio: faker.lorem.lines({ min: 10, max: 15 }),
};

export function createRandomUser() {
  return {
    userName: faker.internet.userName(),
    fullName: faker.internet.displayName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: '123456',
    phone: faker.phone.number(),
    address: faker.location.city(),
    birthday: faker.date.birthdate(),
    gender: Math.floor(Math.random() * 2),
    bio: faker.lorem.lines({ min: 10, max: 15 }),
  };
}

export const USERS = [
  defaultUser,
  faker.helpers.multiple(createRandomUser, {
    count: 5,
  }),
];
