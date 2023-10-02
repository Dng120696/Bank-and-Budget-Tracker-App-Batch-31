import { useNavigate } from "react-router-dom";

export function LogInPage({ state, dispatch }) {
  const {
    userError,
    passwordError,
    error,
    isError,
    isuserError,
    ispasswordError,
  } = state;

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { userNameInput, passwordInput, adminAccount } = state;

    if (!userNameInput) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: { field: "user", message: "UserName can't be empty" },
      });
      return;
    }

    if (!passwordInput) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: { field: "password", message: "Password can't be empty" },
      });
      return;
    }

    if (
      adminAccount.userName === userNameInput &&
      adminAccount.password === passwordInput
    ) {
      dispatch({ type: "LOGIN_SUCCESS" });
      navigate("/mainPage");
    } else {
      dispatch({
        type: "LOGIN_INVALID",
        payload: "Invalid email or password",
      });
    }
  }

  return (
    <section className="logInForm">
      <h1>ADMIN LOG IN</h1>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="adminUser"
          className="inputUserName"
          placeholder="User Name"
          value={state.userNameInput}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
        {isuserError && <small>{userError}</small>}
        <input
          type="password"
          name="adminPassword"
          className="inputPassword"
          placeholder="Password"
          value={state.passwordInput}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
        />
        {ispasswordError && <small>{passwordError}</small>}
        {isError && <small>{error}</small>}
        <button className="btnLogIn">Log In</button>
      </form>
    </section>
  );
}
