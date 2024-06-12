import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LogInPage } from "./pages/LogInPage";

import { AccountsPage } from "./pages/AccountsPage";
import UserBalance from "./pages/UserBalance";
import DashBoard from "./pages/Dashboard";
import SelectUser from "./components/SelectUser";
import useStore from "./store/store";
import { UserTransaction } from "./pages/UserTransaction";

function App() {
  const selectedAccount = useStore((state) => state.selectedAccount);

  return (
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/mainPage" element={<MainPage />}>
        <Route index element={<DashBoard />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="accounts" element={<AccountsPage />} />

        <Route
          path={`users/${selectedAccount ? ":name" : ""}`}
          element={selectedAccount ? <UserTransaction /> : <SelectUser />}
        />
        <Route path="balance" element={<UserBalance />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}

export default App;
