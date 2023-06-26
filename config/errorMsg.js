export const useErrorMsg = (code) => {
  return ERROR_MSG[code];
}

const ERROR_MSG = {
  "auth/wrong-password": "Wrong user or password information",
  "auth/user-not-found": "User not exist",
}