export const loginFail = (set) => (field, message) =>
  set((state) => {
    state[field] = "";
    state[`${field}Error`] = message;
    state[`is${field}Error`] = true;
    state.validError = "";
  });

export const loginSuccess = (set) => () =>
  set((state) => {
    state.adminUserError = "";
    state.adminPasswordError = "";
    state.validError = "";
  });

export const loginInvalid = (set) => (message) =>
  set((state) => {
    state.adminUserError = message;
    state.isvalidError = true;
  });
