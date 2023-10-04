import { useNavigate } from "react-router-dom";

export function LogInPage({ state, dispatch }) {
  const {
    adminUserError,
    adminPasswordError,
    isadminUserError,
    isadminPasswordError,
    validError,
    isvalidError,
  } = state;

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { adminUser, adminPassword, adminAccount } = state;

    if (!adminUser) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: { field: "adminUser", message: "UserName can't be empty" },
      });
      return;
    }

    if (!adminPassword) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: { field: "adminPassword", message: "Password can't be empty" },
      });
      return;
    }

    if (
      adminAccount.userName === adminUser &&
      adminAccount.password === adminPassword
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

  function hanleInput(e) {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUT",
      payload: { field: name, input: value },
    });
  }

  const checkError = (error) =>
    error ? "border-1 border-rose-500" : "border-[1px_solid_rgba(0,0,0,0.1)]";
  return (
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40rem] text-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">ADMIN LOG IN</h1>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="adminUser"
          className={` ${checkError(
            isadminUserError
          )} text-xl rounded-md text-gray-600 mb-10`}
          placeholder="User Name"
          value={state.adminUser}
          onChange={hanleInput}
        />
        {isadminUserError && (
          <small className="text-lg text-red-500 absolute top-[11rem] left-12">
            {adminUserError}
          </small>
        )}
        <input
          type="password"
          name="adminPassword"
          className={` ${checkError(
            isadminPasswordError
          )} text-xl rounded-md text-gray-600 mb-10`}
          placeholder="Password"
          value={state.adminPassword}
          onChange={hanleInput}
        />
        {isadminPasswordError && (
          <small className="text-lg text-red-500 absolute bottom-[7.2rem] left-12">
            {adminPasswordError}
          </small>
        )}
        {isvalidError && (
          <small className="text-lg text-red-500 absolute bottom-[7.2rem] left-12">
            {validError}
          </small>
        )}
        <button className="text-xl uppercase bg-blue-500 text-white w-full border-none py-4 rounded-md">
          Log In
        </button>
      </form>
    </section>
  );
}
