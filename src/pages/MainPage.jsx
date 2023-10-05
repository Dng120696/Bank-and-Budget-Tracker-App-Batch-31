import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function MainPage({ state }) {
  const [isOpenLink, setIsOpenLink] = useState(false);

  const navigate = useNavigate();
  console.log(state.isApproved);

  return (
    <main
      className={`main__page ${
        state.isOpen || state.isApproved || state.isOpenDetails ? "overlay" : ""
      }`}
    >
      <aside className="side__bar relative">
        <h1 className="logo__title">BANK</h1>
        <div className="menu" onClick={() => setIsOpenLink((open) => !open)}>
          <i className="fa-solid fa-bars-staggered"></i>
        </div>
        <ul className={`link__item ${isOpenLink ? "open__link" : ""}`}>
          <li>
            <NavLink to="/mainPage/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/accounts">Accounts</NavLink>
          </li>
          <li>
            <NavLink
              to={`/mainPage/users/${state.selectedAccount?.firstName || ""}`}
            >
              User&apos;s Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/balance">All User Balance</NavLink>
          </li>
        </ul>
        <button
          className="absolute text-4xl bottom-20 left-12 uppercase font-bold tracking-[1px]"
          onClick={() => navigate("/")}
        >
          Log Out
        </button>
      </aside>

      <Outlet />
    </main>
  );
}
