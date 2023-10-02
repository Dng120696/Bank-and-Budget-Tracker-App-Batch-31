import { initialStateLogIn } from "./initialStateLogIn";

export function reducerLogIn(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, userNameInput: action.payload, userError: "" };
    case "SET_PASSWORD":
      return { ...state, passwordInput: action.payload, passwordError: "" };

    case "LOGIN_FAIL":
      return {
        ...state,
        [action.payload.field + "Error"]: action.payload.message,
        ["is" + action.payload.field + "Error"]: true,
        error: "",
      };
    case "LOGIN_INVALID":
      return {
        ...state,
        error: action.payload,
        isError: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userError: "",
        passwordError: "",
        error: "",
      };

    default:
      return initialStateLogIn;
  }
}
