import AccountsList from "../components/AccountsList";
import CreateProfile from "../components/CreateProfile";
import HeaderAccountList from "../components/HeaderAccountList";
import AccountDetails from "../components/AccountDetails";

export function CreateAccount({ state, dispatch, formatBalance }) {
  return (
    <div className="create__account-box">
      <section className="create__account">
        <h1>ACCOUNT LIST</h1>
        <HeaderAccountList dispatch={dispatch} state={state} />

        <section className="account__list">
          <ul>
            <li>Account No.</li>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email</li>
          </ul>
          <AccountsList state={state} dispatch={dispatch} />
        </section>
        <CreateProfile dispatch={dispatch} state={state} />
        {state.isOpenDetails && (
          <AccountDetails
            state={state}
            dispatch={dispatch}
            formatBalance={formatBalance}
          />
        )}
      </section>
    </div>
  );
}
