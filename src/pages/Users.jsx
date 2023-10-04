import HeaderUser from "../components/HeaderUser";
import InputTransaction from "../components/InputTransaction";
import UserTransactionList from "../components/UserTransactionList";
import FormSendMoney from "../components/FormSendMoney";
import HeaderExpense from "../components/HeaderExpense";
import ListOfExpenses from "../components/ListOfExpenses";
import FormAddingExpense from "../components/FormAddingExpense";

export function Users({ state, dispatch }) {
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const { amountWidthdraw, amountDeposit } = state;

  // Validation and Error Handling Functions
  const regexNotNegative = /^(?!-)\d+(\.\d+)?$/;
  const regexInput = /^[A-Za-z]/;

  function handleInput(e) {
    dispatch({
      type: "SET_INPUT",
      payload: { field: e.target.name, input: e.target.value },
    });
  }

  function handleEmptyInput(field, message) {
    dispatch({
      type: "EMPTY_INPUT",
      payload: { field, message },
    });
  }

  function validateInput(field, regex, errorMessage) {
    if (!regex.test(state[field])) {
      handleEmptyInput(field, errorMessage);
      return false;
    }
    return true;
  }

  function handleError(stateField, field, regex, type) {
    if (!stateField) {
      handleEmptyInput(field, "Can't be Empty");
      return;
    }
    if (!validateInput(field, regex, "Invalid Input")) {
      return;
    }
    if (stateField < 1000) {
      handleEmptyInput(field, "Must be greater than 1000");
      return;
    }
    dispatch({ type });
  }

  function handleWidthdraw(e) {
    e.preventDefault();
    const field = "amountWidthdraw";
    if (amountWidthdraw > state.selectedAccount.initialBalance) {
      handleEmptyInput(field, "Not Enough Balance");
      return;
    }
    handleError(amountWidthdraw, field, regexNotNegative, "WIDTHDRAW");
  }

  function handleDeposit(e) {
    e.preventDefault();
    const field = "amountDeposit";
    handleError(amountDeposit, field, regexNotNegative, "DEPOSIT");
  }

  function handleSendMoney(e) {
    e.preventDefault();

    const fields = ["senderId", "receiverId", "senderAmount"];

    for (const field of fields) {
      console.log(field);
      if (!state[field]) {
        handleEmptyInput(field, "Can't be Empty");
        return;
      }
      if (!validateInput(field, regexNotNegative, "Invalid Input")) {
        return;
      }
      switch (field) {
        case "senderId":
          if (state[field] !== state.selectedAccount.id) {
            handleEmptyInput(field, "Sender does not exist");
            return;
          }

          break;
        case "receiverId": {
          console.log(state.accountList);
          const checkID = state.accountList.some(
            (acc) => acc.id === state[field]
          );
          if (!checkID) {
            handleEmptyInput(field, "Receiver does not exist");
            return;
          }
          if (state[field] === state.senderId) {
            handleEmptyInput(field, "Cannot be the same as Sender ID");
            return;
          }
          break;
        }
        case "senderAmount": {
          if (state[field] < 1000) {
            handleEmptyInput(field, "Must be greater than 1000");
            return;
          }
          if (state[field] > state.selectedAccount.initialBalance) {
            handleEmptyInput(field, "Not Enough Balance");
            return;
          }
          break;
        }
      }
    }

    dispatch({ type: "SEND_MONEY" });
  }

  function handleExpense(e) {
    e.preventDefault();

    const fields = ["expenseName", "expenseAmount"];

    for (const field of fields) {
      console.log(field);
      if (!state[field]) {
        handleEmptyInput(field, "Can't be Empty");
        return;
      }

      switch (field) {
        case "expenseName":
          if (!validateInput(field, regexInput, "Can't start with a number")) {
            return;
          }
          if (state[field].length <= 2) {
            handleEmptyInput(field, "Please enter at least 3 characters");
            return;
          }
          break;
        case "expenseAmount":
          if (!validateInput(field, regexNotNegative, "Invalid Input")) {
            return;
          }
          if (state[field] < 100) {
            handleEmptyInput(field, "Must be greater than 100");
            return;
          }
          break;
      }
    }

    dispatch({ type: "EXPENSE_ITEM" });
  }
  // function handleTransfer(e) {
  //   e.preventDefault();
  //   if (!amountDeposit) {
  //     handleEmptyInput("amountDeposit", "Can't be Empty");
  //     return;
  //   }
  //   dispatch({ type: "DEPOSIT" });
  // }

  return (
    <>
      <section className="user__account">
        <HeaderUser state={state} formatBalance={formatBalance} />

        <section className="section__transact">
          <UserTransactionList state={state} formatBalance={formatBalance} />
          <InputTransaction
            state={state}
            onDeposit={handleDeposit}
            onWidthdraw={handleWidthdraw}
            onSetInput={handleInput}
          />
          <FormSendMoney
            state={state}
            onSetInput={handleInput}
            onSendMoney={handleSendMoney}
          />
        </section>

        <section className="expense__list">
          <HeaderExpense />
          <ListOfExpenses
            state={state}
            dispatch={dispatch}
            formatBalance={formatBalance}
          />
          <FormAddingExpense
            state={state}
            onSetInput={handleInput}
            onSetExpene={handleExpense}
          />
        </section>
      </section>
    </>
  );
}
