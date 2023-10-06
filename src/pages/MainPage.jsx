import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logos from "../assets/logo.png";
export function MainPage({ state }) {
  const [isOpenLink, setIsOpenLink] = useState(false);

  const navigate = useNavigate();
  const checkSelected =
    state.selectedAccount === null || state.selectedAccount === "";
  return (
    <main
      className={`main__page ${
        state.isOpen || state.isApproved || state.isOpenDetails ? "overlay" : ""
      }`}
    >
      <aside className="side__bar relative">
        <div className=" absolute left-0 top-0 w-full h-[26rem]">
          <img
            src={logos}
            alt=""
            className="absolute w-full left-0 top-0 h-[26rem]"
          />
          <h1 className="logo__title absolute z-10 bottom-[-1.5rem] left-1/2 translate-x-[-50%] translate-y-[-50%] text-5xl w-full text-blue-900 text-center font-bold">
            RISING BANK
          </h1>
        </div>

        <div className="menu" onClick={() => setIsOpenLink((open) => !open)}>
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
              Account Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/balance">User Balances</NavLink>
          </li>
        </ul>
        <button
          className="absolute text-4xl bottom-20 left-12 py-6 px-10 block tracking-[1px] font-medium text-gray-500"
          onClick={() => navigate("/")}
        >
          Log Out
        </button>
      </aside>

      <Outlet />
    </main>
  );
}
