function CreateProfile({ state, dispatch }) {
  const {
    isaccountHolderFirstNameError,
    isaccountHolderLastNameError,
    isaccountInitialBalanceError,
    isemailError,
    isbirthDateError,
    accountHolderFirstNameError,
    accountHolderLastNameError,
    accountInitialBalanceError,
    birthDateError,
    emailError,
    accountList,
  } = state;

  const listFrstName = accountList.map((acc) => acc.firstName.toLowerCase());
  const listEmail = accountList.map((acc) => acc.email.toLowerCase());

  const regexInput = /^[A-Za-z]/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexNotNegative = /^(?!-)\d+(\.\d+)?$/;

  function handleError(field, message) {
    dispatch({
      type: "EMPTY_INPUT",
      payload: { field, message },
    });
  }

  function validateInput(field, regex, errorMessage) {
    if (!regex.test(state[field])) {
      handleError(field, errorMessage);
      return false;
    }
    return true;
  }

  function createAccount(e) {
    e.preventDefault();
    const fields = [
      "accountHolderFirstName",
      "accountHolderLastName",
      "email",
      "birthDate",
      "accountInitialBalance",
    ];

    for (const field of fields) {
      if (!state[field]) {
        handleError(field, "Can't be Empty");
        return;
      }

      switch (field) {
        case "accountHolderFirstName":
        case "accountHolderLastName":
          if (!validateInput(field, regexInput, "Can't start with a number")) {
            return;
          }
          if (listFrstName.includes(state[field].toLowerCase())) {
            handleError(field, "User already exists");
            return;
          }
          break;
        case "email":
          if (!validateInput(field, regexEmail, "Invalid email address")) {
            return;
          }
          if (listEmail.includes(state[field].toLowerCase())) {
            handleError(field, "Email already exists");
            return;
          }
          break;
        case "accountInitialBalance":
          if (!validateInput(field, regexNotNegative, "Invalid Input")) {
            return;
          }
          if (state[field] < 1000) {
            handleError(field, "Must be greater than 1000");
            return;
          }
          if (!(state[field] % 1000 === 0)) {
            handleError(field, "Invalid Amount");
            return;
          }
          break;
        case "birthDate": {
          const inputDate = new Date(state[field]);
          const currentDate = new Date();

          if (inputDate >= currentDate) {
            handleError(field, "Must be not in the Future ");
            return;
          }
          break;
        }

        default:
          break;
      }
    }

    dispatch({ type: "CREATE_ACCOUNT" });
  }

  const chechError = (isError) =>
    isError ? "border-1 border-rose-500" : "border-[2px_solid_rgba(0,0,0,0.2)]";
  return (
    <div
      className={`create__account-profile ${state.isOpen ? "block" : "hidden"}`}
    >
      <h1>CREATING ACCOUNT</h1>
      <i
        className="fa-solid fa-xmark text-4xl absolute top-[2rem] right-[2rem] hover:cursor-pointer "
        onClick={() =>
          dispatch({ type: "CLOSE_MODAL-ACCOUNT", payload: false })
        }
      ></i>
      <form id="createProfile" onSubmit={createAccount}>
        <div className="relative">
          <input
            type="text"
            name="accountHolderFirstName"
            id="input__first-name"
            placeholder="First Name"
            className={chechError(isaccountHolderFirstNameError)}
            value={state.accountHolderFirstName}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: {
                  field: e.target.name,
                  input: e.target.value,
                },
              })
            }
          />
          {isaccountHolderFirstNameError ? (
            <small className="absolute bottom-0 left-0 text-xl text-red-400">
              {accountHolderFirstNameError}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="accountHolderLastName"
            id="input__last-name"
            placeholder="Last Name"
            value={state.accountHolderLastName}
            className={chechError(isaccountHolderLastNameError)}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: {
                  field: e.target.name,
                  input: e.target.value,
                },
              })
            }
          />
          {isaccountHolderLastNameError ? (
            <small className="absolute bottom-0 left-0 text-xl text-red-400">
              {accountHolderLastNameError}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={state.email}
            className={chechError(isemailError)}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { field: e.target.name, input: e.target.value },
              })
            }
          />
          {isemailError ? (
            <small className="absolute bottom-0 left-0 text-xl text-red-400">
              {emailError}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <input
            type="date"
            name="birthDate"
            id="inputDate"
            value={state.birthDate}
            className={chechError(isbirthDateError)}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { field: e.target.name, input: e.target.value },
              })
            }
          />
          {isbirthDateError ? (
            <small className="absolute bottom-0 left-0 text-xl text-red-400">
              {birthDateError}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            name="accountInitialBalance"
            id="inputBalance"
            placeholder="Initial Balance"
            value={state.accountInitialBalance}
            className={chechError(isaccountInitialBalanceError)}
            onChange={(e) =>
              dispatch({
                type: "SET_INPUT",
                payload: { field: e.target.name, input: e.target.value },
              })
            }
          />
          {isaccountInitialBalanceError ? (
            <small className="absolute bottom-[1rem] left-0 text-xl text-red-400">
              {accountInitialBalanceError}
            </small>
          ) : (
            ""
          )}
        </div>

        <button className="btn__create-account">Create Account</button>
      </form>
    </div>
  );
}

export default CreateProfile;
