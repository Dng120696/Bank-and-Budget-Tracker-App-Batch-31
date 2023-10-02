import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function MainPage({ state }) {
  const [isOpenLink, setIsOpenLink] = useState(false);
  return (
    <main className="main__page">
      <aside className="side__bar">
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
              to={`/mainPage/Users/${state.selectedAccount?.firstName || ""}`}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/mainPage/transaction">Transaction</NavLink>
          </li>
        </ul>
      </aside>

      <Outlet />
    </main>
  );
}
