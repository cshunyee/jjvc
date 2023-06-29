export const useErrorMsg = (code) => {
  if (code in ERROR_MSG) return ERROR_MSG[code];
  return "Unknown Error";
};

const ERROR_MSG = {
  "auth/wrong-password": "Wrong user or password information",
  "auth/user-not-found": "User not exist",
};
