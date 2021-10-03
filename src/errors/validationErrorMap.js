export const validationErrorMap = (validationError) => {
  const errors = validationError.errors.reduce((errors, { path, message }) => {
    const errorWithMessages = errors[path];

    if (errorWithMessages) {
      return { ...errors, [path]: [...errorWithMessages, message] };
    }

    return { ...errors, [path]: [message] };
  }, {});

  return errors;
};
