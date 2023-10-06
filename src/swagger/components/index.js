import user from './user.json';
import tag from './tag.json';
import topic from './topic.json';
import post from './post.json';

const schemas = {
  ...user,
  ...tag,
  ...topic,
  ...post,
};

export default {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas,
    parameters: {
      skipParam: {
        name: 'skip',
        in: 'query',
        description: 'number of items to skip',
        required: true,
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      limitParam: {
        name: 'limit',
        in: 'query',
        description: 'max records to return',
        required: true,
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    responses: {
      NotFound: {
        description: 'Entity not found.',
      },
      IllegalInput: {
        description: 'Illegal input for operation.',
      },
    },
  },
};
