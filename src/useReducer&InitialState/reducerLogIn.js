export function reducerLogIn(state, action) {
  switch (action.type) {
    case "SET_INPUT": {
      const { field, input } = action.payload;
      return {
        ...state,
        [field]: input,
        [`${field}Error`]: "",
        [`is${field}Error`]: false,
      };
    }
    case "LOGIN_FAIL": {
      const { field, message } = action.payload;
      return {
        ...state,
        [`${field}Error`]: message,
        [`is${field}Error`]: true,
        validError: "",
      };
    }
    case "LOGIN_INVALID":
      return {
        ...state,
        validError: action.payload,
        isvalidError: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        adminUserError: "",
        adminPasswordError: "",
        validError: "",
      };
    default:
      return state;
  }
}
