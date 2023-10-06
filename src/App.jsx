import { useEffect, useReducer } from "react";
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
import SelectUser from "./components/SelectUser";

function App() {
  const [stateLogIn, dispatchLogIn] = useReducer(
    reducerLogIn,
    initialStateLogIn
  );
  const [stateTransact, dispatchTransact] = useReducer(
    reducerTransaction,
    initialStateTransaction
  );
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const nagivate = useNavigate();

  useEffect(() => {
    if (
      stateTransact?.selectedAccount === null ||
      stateTransact?.selectedAccount === ""
    ) {
      nagivate("/mainPage/users");
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<LogInPage state={stateLogIn} dispatch={dispatchLogIn} />}
      />
      <Route path="/mainPage" element={<MainPage state={stateTransact} />}>
        <Route index element={<DashBoard />} />
        <Route
          path="dashboard"
          element={
            <DashBoard formatBalance={formatBalance} state={stateTransact} />
          }
        />
        <Route
          path="accounts"
          element={
            <CreateAccount
              state={stateTransact}
              dispatch={dispatchTransact}
              formatBalance={formatBalance}
            />
          }
        />
        <Route
          path={`users/${stateTransact.selectedAccount ? ":name" : ""}`}
          element={
            stateTransact.selectedAccount ? (
              <Users state={stateTransact} dispatch={dispatchTransact} />
            ) : (
              <SelectUser />
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
