import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    userName: faker.internet.userName(),
    fullName: faker.internet.displayName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: '123456',
    phone: faker.phone.number(),
    address: faker.location.city(),
    birthdate: faker.date.birthdate(),
    gender: Math.floor(Math.random() * 2),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
