import { generate } from 'shortid';

/** slug generator */
export const slugify = (str, gen = true, prefix = '-') => {
  const slug = String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[đ]/g, 'd') // change đ to d
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, prefix) // replace spaces with hyphens
    .replace(/-+/g, prefix);
  return `${slug}${gen ? prefix + generate() : ''}`;
};

export const limitExc = (limit) => {
  const MIN_LIMIT = 3;
  const MAX_LIMIT = 24;

  const limitFormat = Number(limit) ?? MIN_LIMIT;

  if (limitFormat) {
    if (limitFormat < MIN_LIMIT) return MIN_LIMIT;
    if (limitFormat > MAX_LIMIT) return MAX_LIMIT;
    return limitFormat;
  }

  return MIN_LIMIT;
};
