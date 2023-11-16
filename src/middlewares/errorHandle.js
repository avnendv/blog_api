import { StatusCodes } from 'http-status-codes';
import logger from '@/logs/winston';
import { errorResponse } from '@/utils';
import DiscordService from '@/config/discord';
import { IS_PROD } from '@/config/constants';

const infoStack = (stack) => {
  const stackLines = stack?.split('\n');
  if (stackLines && stackLines.length > 1) {
    // Get the second line in the stack (usually contains fileName and lineNumber)
    const secondLine = stackLines[1].trim();

    // Parse information from the stack stream
    const match = /\((.*):(\d+):(\d+)\)/.exec(secondLine);

    if (match) {
      const raw = match[1];
      const fileName = match[1];
      const lineNumber = match[2];

      return { raw, fileName, lineNumber };
    }
  }
  return { raw: null, fileName: null, lineNumber: null };
};

// eslint-disable-next-line no-unused-vars
export const errorHandle = (err, _req, res, _next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // If there is an error without a message, get the standard ReasonPhrases according to the Status Code
    stack: infoStack(err.stack),
  };

  const error = errorResponse(responseError);
  const { isLogger, ...errorData } = error;

  if (isLogger) {
    logger.error(JSON.stringify(errorData));

    DiscordService.sendToFormatCode({ ...errorData, stack: { ...errorData.stack, full: err.stack } });
  }

  return res.json({
    result: errorData.result,
    msg: IS_PROD ? 'Something went wrong! Please check the data again!' : errorData.message,
  });
};
