export const setInput = (set) => (field, input) => {
  set((state) => {
    state[field] = input;
    state[`${field}Error`] = "";
    state[`is${field}Error`] = false;
  });
};

export const validateInput = (set) => (field, message) => {
  set((state) => {
    state[`${field}Error`] = message;
    state[`is${field}Error`] = true;
    state.validError = "";
  });
};
