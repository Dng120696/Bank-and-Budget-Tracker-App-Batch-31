import { NavLink } from "react-router-dom";

export function CreateAccount({ state, dispatch }) {
  function createAccount(e) {
    e.preventDefault();
    const {
      accountHolderFirstName,
      accountHolderLastName,
      accountInitialBalance,
      email,
      birthDate,
    } = state;
    if (
      !accountHolderFirstName ||
      !accountHolderLastName ||
      !accountInitialBalance ||
      !email ||
      !birthDate
    )
      return;
    dispatch({ type: "CREATE_ACCOUNT" });
    // navigate("/transaction");
  }

  return (
    <section className="create__account">
      <h1>ACCOUNT LIST</h1>
      <header className="header__account">
        <input
          type="search"
          name="searchName"
          className="input__search"
          placeholder="Search..."
        />
        <button
          className="btn btn__add-account"
          onClick={() => dispatch({ type: "ADD_ACCOUNT" })}
        >
          Add Account
        </button>
      </header>

      <section className="account__list">
        <ul className="">
          <li>ID</li>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Email</li>
        </ul>
        <div className="list__item">
          {state.accountList.length === 0 ? (
            <p>Account List Empty</p>
          ) : (
            state.accountList.map((acc) => (
              <ul
                key={acc.id}
                className="list"
                onClick={() => {
                  dispatch({ type: "SELECTED_ACCOUNT", payload: acc });
                }}
              >
                <li>{acc.id}</li>
                <li>{acc.firstName}</li>
                <li>{acc.lastName}</li>
                <li>{acc.email}</li>
                <li className="button__list">
                  <NavLink to={`/mainPage/users/${acc.firstName}`}>
                    <button>View</button>
                  </NavLink>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_ACCOUNT", payload: acc.id })
                    }
                  >
                    Delete
                  </button>
                </li>
              </ul>
            ))
          )}
        </div>
      </section>
      <div
        className={`create__account-profile ${
          state.isAddAcc ? "block" : "hidden"
        }`}
      >
        <h1>CREATING ACCOUNT</h1>
        <form id="createProfile" onSubmit={createAccount}>
          <input
            type="text"
            name="accountHolderFirstName"
            id="input__first-name"
            placeholder="First Name"
            value={state.accountHolderFirstName}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: {
                  name: e.target.name,
                  input: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            name="accountHolderLastName"
            id="input__last-name"
            placeholder="Last Name"
            value={state.accountHolderLastName}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: {
                  name: e.target.name,
                  input: e.target.value,
                },
              })
            }
          />
          <input
            type="email"
            name="email"
            className="input__email"
            placeholder="example@gmail.com"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { name: e.target.name, input: e.target.value },
              })
            }
          />
          <input
            type="date"
            name="birthDate"
            id="inputDate"
            value={state.birthDate}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { name: e.target.name, input: e.target.value },
              })
            }
          />
          <input
            type="number"
            name="accountInitialBalance"
            id="inputBalance"
            placeholder="Initial Balance"
            value={state.accountInitialBalance}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { name: e.target.name, input: e.target.value },
              })
            }
          />

          <button className="btn__create-account">Create Account</button>
        </form>
      </div>
    </section>
  );
}
