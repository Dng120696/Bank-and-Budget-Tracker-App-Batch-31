import AccountsList from "../components/AccountsList";
import CreateProfile from "../components/CreateProfile";
import HeaderAccountList from "../components/HeaderAccountList";
import AccountDetails from "../components/AccountDetails";
import useStore from "../store/store";

export function AccountsPage() {
  const isOpenDetails = useStore((state) => state.isOpenDetails);
  return (
    <div className="create__account-box">
      <section className="create__account">
        <h1>ACCOUNT LIST</h1>
        <HeaderAccountList />

        <section className="account__list">
          <ul>
            <li>Account No.</li>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email</li>
          </ul>
          <AccountsList />
        </section>
        <CreateProfile />
        {isOpenDetails && <AccountDetails />}
      </section>
    </div>
  );
}
