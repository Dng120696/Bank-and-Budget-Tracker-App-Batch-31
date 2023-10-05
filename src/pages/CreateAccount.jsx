import ListItem from "../components/ListItem";
import CreateProfile from "../components/CreateProfile";
import HeaderAccountList from "../components/HeaderAccountList";
import AccountDetails from "../components/AccountDetails";

export function CreateAccount({ state, dispatch }) {
  return (
    <section className="create__account">
      <h1>ACCOUNT LIST</h1>
      <HeaderAccountList dispatch={dispatch} />

      <section className="account__list">
        <ul>
          <li>Account No.</li>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email</li>
        </ul>
        <ListItem state={state} dispatch={dispatch} />
      </section>
      <CreateProfile dispatch={dispatch} state={state} />
      {state.isOpenDetails && (
        <AccountDetails state={state} dispatch={dispatch} />
      )}
    </section>
  );
}
