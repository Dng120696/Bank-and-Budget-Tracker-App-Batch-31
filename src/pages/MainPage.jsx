import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logos from "../assets/logo.png";
export function MainPage({ state, stateLogIn }) {
  const [isOpenLink, setIsOpenLink] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);

  const navigate = useNavigate();

  function handleLoadData() {
    localStorage.setItem("bankingAppData", JSON.stringify(state));
    console.log(
      "User Data:",
      JSON.parse(localStorage.getItem("bankingAppData"))
    );
    localStorage.setItem("logInData", JSON.stringify(stateLogIn));
    console.log("User Data:", JSON.parse(localStorage.getItem("logInData")));
    setIsLoaded((loaded) => !loaded);
    setTimeout(() => setIsLoaded((loaded) => !loaded), 3000);
  }

  return (
    <main
      className={`main__page ${
        state.isOpen || state.isApproved || state.isOpenDetails || isLogOut
          ? "overlay"
          : ""
      }`}
    >
      <aside className="side__bar relative">
        <div className=" absolute left-0 top-0 w-full h-full lg:h-[26rem]">
          <img
            src={logos}
            alt=""
            className="absolute w-24 h-full lg:w-full right-0 top-0 lg:top-[-1rem] lg:h-[24rem]"
          />
          <h1 className="logo__title absolute z-10 bottom-0 left-1/2 translate-x-[-50%] translate-y-[-50%] text-5xl w-full text-blue-900 text-center font-bold hidden lg:block">
            RISING BANK
          </h1>
        </div>

        <div
          className="menu hover:cursor-pointer text-gray-600"
          onClick={() => setIsOpenLink((open) => !open)}
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </div>
        <ul className={`link__item ${isOpenLink ? "open__link" : ""}`}>
          <li className="pb-6 mb-6">
            <NavLink to="/mainPage/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/accounts">Accounts</NavLink>
          </li>
          <li>
            <NavLink
              to={`/mainPage/users/${state.selectedAccount?.firstName || ""}`}
            >
              User Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/balance">User Balances</NavLink>
          </li>
          <li
            className="load__data text-2xl lg:text-3xl hover:cursor-pointer text-gray-600 hover:bg-blue-600 hover:text-white rounded-2xl px-10 py-6"
              onClick={handleLoadData}
          >
            Load User Data
          </li>
          <li
            className="text-gray-600 lg:absolute top-[100%] hover:bg-blue-600 hover:cursor-pointer hover:text-white rounded-2xl"
            onClick={() => setIsLogOut(true)}
          >
            <button>Log Out</button>
          </li>
        </ul>
      </aside>

      {isLogOut && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.3)] p-12 w-[35rem] h-[20rem] bg-white z-50 flex flex-col justify-between items-center rounded-lg ">
          <p className="text-4xl font-bold text-center">
            Are you sure you want to Log out?
          </p>

          <div className="grid grid-cols-2 gap-10  w-full">
            <button
              className="w-full text-center rounded-md py-4 text-white bg-red-600 text-2xl"
              onClick={() => navigate("/")}
            >
              Yes
            </button>
            <button
              className="w-full text-center rounded-md py-6 bg-blue-600 text-white text-2xl"
              onClick={() => {
                navigate("/mainPage/dashboard");
                setIsLogOut(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}

      <div
        className={`load__box absolute top-10 right-10  text-xl font-medium h-16 rounded-lg bg-green-500 text-white flex items-center justify-center px-12 py-10 opacity-0 translate-y-[-5rem] z-50 ${
          isLoaded ? "show__load" : ""
        }`}
      >
        <p>
          The data has been Loaded{" "}
          <i className="fa-regular fa-circle-check text-3xl ml-4"></i>
        </p>
      </div>

      <Outlet />
    </main>
  );
}
