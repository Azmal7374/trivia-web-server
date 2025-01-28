/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error.interface';
import { TGenericErrorResponse } from '../interface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already Exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
