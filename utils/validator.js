export const isNumber = (text) => {
  const regex = /^\d+$/;

  return regex.test(text);
};

export const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isValidPhone = (phone) => {
  let input = String(phone).toLowerCase();

  if (input.startsWith("+60")) {
    return input.match(/^\+60\d{9}$/);
  } else if (input.startsWith("0")) {
    return input.match(/0\d{9}$/);
  } else if (input.startsWith("+65")) {
    return input.match(/^\+65\d{8}$/);
  } else {
    return input.match(/\d{8}$/);
  }
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const validator = {
  isNumber,
  isEmail,
  isValidPhone,
  isJsonString,
};

export default validator;
