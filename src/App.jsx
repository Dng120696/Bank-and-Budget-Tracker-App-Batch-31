import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
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

  return (
    <Routes>
      <Route
        path="/"
        element={<LogInPage state={stateLogIn} dispatch={dispatchLogIn} />}
      />
      <Route path="/mainPage" element={<MainPage state={stateTransact} />}>
        <Route index element={<DashBoard />} />
        <Route path="dashboard" element={<DashBoard />} />
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
              <p>Need to Select User</p>
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
