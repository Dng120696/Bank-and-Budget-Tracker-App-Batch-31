import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logos from "../assets/logo.png";
export function MainPage({ state }) {
  const [isOpenLink, setIsOpenLink] = useState(false);
  const navigate = useNavigate();

  function handleLoadData() {
    localStorage.setItem("initialState", JSON.stringify(state));
    console.log("User Data:", JSON.parse(localStorage.getItem("initialState")));
  }
  return (
    <main
      className={`main__page ${
        state.isOpen || state.isApproved || state.isOpenDetails ? "overlay" : ""
      }`}
    >
      <aside className="side__bar relative">
        <div className=" absolute left-0 top-0 w-full h-full lg:h-[26rem]">
          <img
            src={logos}
            alt=""
            className="absolute w-24 h-full lg:w-full right-0 top-[-1rem] lg:h-[24rem]"
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
            <NavLink to="/mainPage/accounts">Accounts Overview</NavLink>
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
            className="load__data text-3xl hover:cursor-pointer text-gray-600 hover:bg-blue-600 hover:text-white rounded-2xl"
            onClick={handleLoadData}
          >
            Load User Data
          </li>
        </ul>

        <div className="relative lg:absolute  text-xl lg:text-4xl bottom-[-36rem] lg:bottom-12 left-[-72.5%] lg:left-12 py-6 px-6  tracking-[1px] font-medium text-gray-500 flex flex-col items-start gap-10 ">
          <button onClick={() => navigate("/")}>Log Out</button>
        </div>
      </aside>

      <Outlet />
    </main>
  );
}
