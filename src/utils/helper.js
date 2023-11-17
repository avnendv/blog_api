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

export const calculateReadingTime = (content) => {
  // Let's say each word takes about 0.25 seconds to read
  const wordsPerMinute = 200; // Average number of words a reader can read in 1 minute

  const wordCount = content.split(/\s+/).length; // Count the number of words in the content

  const readingTimeInMinutes = wordCount / wordsPerMinute;

  // Round up to get an integer result
  const readingTimeInMinutesRounded = Math.ceil(readingTimeInMinutes);

  return readingTimeInMinutesRounded;
};
