import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/profilelogo.png";
import useStore from "../store/store";

export function LogInPage() {
  const {
    adminUser,
    adminPassword,
    adminUserError,
    adminPasswordError,
    isadminPasswordError,
    isadminUserError,
    isvalidError,
    validError,
    adminAccount,
    setInput,
    login_fail,
    login_success,
    login_invalid,
  } = useStore();
  const [isOpenPass, setIsOpenPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminUser) {
      login_fail("adminUser", "User Name can't be empty");
      return;
    }

    if (!adminPassword) {
      login_fail("adminPassword", "Password can't be empty");
      return;
    }

    if (
      adminAccount.userName === adminUser &&
      adminAccount.password === adminPassword
    ) {
      login_success();
      navigate("/mainPage/dashboard");
    } else {
      login_invalid("Invalid user name or password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput(name, value);
  };

  const togglePasswordVisibility = () => {
    setIsOpenPass((open) => !open);
  };

  const getInputErrorClassName = (error) =>
    error ? "border-1 border-rose-500" : "border-[1px_solid_rgba(0,0,0,0.1)]";

  return (
    <div className="log__in">
      <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40rem] text-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-12 bg-white rounded-md">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="logo" className="rounded-full w-28" />
        </div>
        <h1 className="text-5xl font-bold mb-8 text-gray-600"> ADMIN LOGIN</h1>
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="adminUser"
            className={` ${getInputErrorClassName(
              isadminUserError
            )} text-xl rounded-md text-gray-600 mb-10`}
            placeholder="User Name"
            value={adminUser}
            onChange={handleInputChange}
          />
          {isadminUserError && (
            <small className="text-lg text-red-500 absolute top-[21rem] left-12">
              {adminUserError}
            </small>
          )}
          <div className="relative">
            <input
              type={isOpenPass ? "text" : "password"}
              name="adminPassword"
              className={` ${getInputErrorClassName(
                isadminPasswordError
              )} text-xl rounded-md text-gray-600 mb-10`}
              placeholder="Password"
              value={adminPassword}
              onChange={handleInputChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={`text-gray-400 text-2xl hover:cursor-pointer absolute right-4 top-[2.3rem] translate-x-[-50%] translate-y-[-50%] ${
                isOpenPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
          </div>

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

          <button className="text-xl uppercase bg-blue-500 text-white w-full border-none py-4 rounded-md tracking-[1px] font-medium">
            Log In
          </button>
        </form>
      </section>
    </div>
  );
}
