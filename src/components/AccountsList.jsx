import useStore from "../store/store";

function AccountsList() {
  const state = useStore();
  const { selected_account, delete_account } = state;
  return (
    <div className="account__list-box">
      {state?.filteredAccount.length === 0 ? (
        <p>Add Account</p>
      ) : (
        state?.filteredAccount.map((acc) => (
          <ul key={acc.id} className="list">
            <li className="ml-5">{acc.id}</li>
            <li className="ml-4">{acc.firstName}</li>
            <li className="ml-4">{acc.lastName}</li>
            <li className="ml-2">{acc.email}</li>
            <li className="button__list">
              <button onClick={() => selected_account(acc)}>View</button>

              <button onClick={() => delete_account(acc.id)}>Delete</button>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}

export default AccountsList;
