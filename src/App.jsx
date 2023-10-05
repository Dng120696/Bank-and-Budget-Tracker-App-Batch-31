import { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { initialStateLogIn } from "./useReducer&InitialState/initialStateLogIn";
import { initialStateTransaction } from "./useReducer&InitialState/initialStateTransaction";
import { reducerLogIn } from "./useReducer&InitialState/reducerLogIn";
import { reducerTransaction } from "./useReducer&InitialState/reducerTransaction";
import { LogInPage } from "./pages/LogInPage";
import { Users } from "./pages/Users";
import { CreateAccount } from "./pages/CreateAccount";
import UserBalance from "./pages/UserBalance";
import DashBoard from "./pages/Dashboard";

function App() {
  const [stateLogIn, dispatchLogIn] = useReducer(
    reducerLogIn,
    initialStateLogIn
  );
  const [stateTransact, dispatchTransact] = useReducer(
    reducerTransaction,
    initialStateTransaction
  );

  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<LogInPage state={stateLogIn} dispatch={dispatchLogIn} />}
      />
      <Route path="/mainPage" element={<MainPage state={stateTransact} />}>
        <Route index element={<DashBoard />} />
        <Route path="dashboard" element={<DashBoard state={stateTransact} />} />
        <Route
          path="accounts"
          element={
            <CreateAccount state={stateTransact} dispatch={dispatchTransact} />
          }
        />
        <Route
          path={`users/${stateTransact.selectedAccount ? ":name" : ""}`}
          element={
            stateTransact.selectedAccount ? (
              <Users state={stateTransact} dispatch={dispatchTransact} />
            ) : (
              <p className="absolute top-1/2 left-[60%] translate-x-[-50%] translate-y-[-50%] grid place-items-center w-[80rem] h-[80vh] shadow-[0_0_1rem_rgba(0,0,0,0.3)] text-3xl font-bold">
                <span
                  className="goTo__account absolute text-3xl right-[50%] hover:cursor-pointer text-gray-600"
                  onClick={() => navigate("/mainPage/accounts")}
                >
                  Select User <i className="fa-solid fa-angles-right "></i>
                </span>
              </p>
            )
          }
        />
        <Route path="balance" element={<UserBalance state={stateTransact} />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}

export default App;
