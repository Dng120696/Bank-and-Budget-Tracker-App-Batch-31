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
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40rem] text-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">ADMIN LOG IN</h1>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="adminUser"
          className="text-xl rounded-md text-gray-600 mb-8"
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
          className="text-xl rounded-md text-gray-600 mb-8"
          placeholder="Password"
          value={state.passwordInput}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
        />
        {ispasswordError && <small>{passwordError}</small>}
        {isError && <small>{error}</small>}
        <button className="text-xl uppercase bg-blue-500 text-white w-full border-none py-4 rounded-md">
          Log In
        </button>
      </form>
    </section>
  );
}
