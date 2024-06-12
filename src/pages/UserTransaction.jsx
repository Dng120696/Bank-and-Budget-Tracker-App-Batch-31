import HeaderUser from "../components/HeaderUser";
import InputTransaction from "../components/InputTransaction";
import UserTransactionList from "../components/UserTransactionList";
import FormSendMoney from "../components/FormSendMoney";
import HeaderExpense from "../components/HeaderExpense";
import ListOfExpenses from "../components/ListOfExpenses";
import FormAddingExpense from "../components/FormAddingExpense";
import { useState } from "react";
import CalculateLoan from "../components/CalculateLoan";
import useStore from "../store/store";

export function UserTransaction() {
  const [isOpenApproved, setIsOpenApproved] = useState(false);
  const state = useStore();

  const {
    amountLoan,
    set_input,
    validate_input,
    withdraw,
    deposit,
    send_money,
    create_expense,
    is_approved,
  } = state;

  // Validation and Error Handling Functions
  const regexNotNegative = /^(?!-)\d+(\.\d+)?$/;
  const regexInput = /^[A-Za-z]/;

  function handleInput(e) {
    const { name, value } = e.target;
    set_input(name, value);
  }

  function handleEmptyInput(field, message) {
    validate_input(field, message);
  }

  function validateUser(field, regex, errorMessage) {
    if (!regex.test(state[field])) {
      handleEmptyInput(field, errorMessage);
      return false;
    }
    return true;
  }

  function handleWidthdraw(e) {
    e.preventDefault();
    const field = "amountWidthdraw";
    if (!state[field]) {
      handleEmptyInput(field, "Can't be Empty");
      return;
    }

    if (!validateUser(field, regexNotNegative, "Invalid Input")) {
      return;
    }
    if (state[field] < 1000) {
      handleEmptyInput(field, "Minimum of 1000");
      return;
    }

    if (!(state[field] % 100 === 0)) {
      handleEmptyInput(field, "Invalid Amount");
      return;
    }
    if (+state[field] > +state?.selectedAccount.initialBalance) {
      handleEmptyInput(field, "Not enough money");
      return;
    }
    withdraw();
  }

  function handleDeposit(e) {
    e.preventDefault();
    const field = "amountDeposit";
    if (!state[field]) {
      handleEmptyInput(field, "Can't be Empty");
      return;
    }
    if (!validateUser(field, regexNotNegative, "Invalid Input")) {
      return;
    }
    if (state[field] < 1000) {
      handleEmptyInput(field, "Minimum of 1000");
      return;
    }
    deposit();
  }

  function handleSendMoney(e) {
    e.preventDefault();

    const fields = ["senderId", "receiverId", "senderAmount"];

    for (const field of fields) {
      if (!state[field]) {
        handleEmptyInput(field, "Can't be Empty");
        return;
      }
      if (!validateUser(field, regexNotNegative, "Invalid Input")) {
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
          const checkID = state.accountList.some(
            (acc) => acc.id === state[field]
          );
          if (!checkID) {
            handleEmptyInput(field, "Receiver does not exist");
            return;
          }
          if (state[field] === state.senderId) {
            handleEmptyInput(field, "Can't be the same as Sender");
            return;
          }
          break;
        }
        case "senderAmount": {
          if (state[field] < 1000) {
            handleEmptyInput(field, "Minimum of 1000");
            return;
          }
          if (+state[field] > +state.selectedAccount.initialBalance) {
            handleEmptyInput(field, "Not Enough Money");
            return;
          }
          break;
        }
      }
    }
    send_money();
  }

  function handleExpense(e) {
    e.preventDefault();

    const fields = ["expenseName", "expenseAmount"];

    for (const field of fields) {
      if (!state[field]) {
        handleEmptyInput(field, "Can't be Empty");
        return;
      }

      switch (field) {
        case "expenseName":
          if (!validateUser(field, regexInput, "Can't start with a number")) {
            return;
          }
          if (state[field].length <= 2) {
            handleEmptyInput(field, "Please enter at least 3 characters");
            return;
          }
          break;
        case "expenseAmount":
          if (!validateUser(field, regexNotNegative, "Invalid Input")) {
            return;
          }
          if (state[field] < 100) {
            handleEmptyInput(field, "Must be greater than 100");
            return;
          }
          break;
      }
    }
    create_expense();
  }
  function handleLoan(e) {
    e.preventDefault();
    const field = "amountLoan";
    if (!amountLoan) {
      handleEmptyInput(field, "Can't be Empty");
      return;
    }
    if (!validateUser(field, regexNotNegative, "Invalid Input")) {
      return;
    }
    if (amountLoan < 5000) {
      handleEmptyInput(field, "Minimum of 5,000");
      return;
    }
    if (amountLoan > 500000) {
      handleEmptyInput(field, "Maximum of 500,000");
      return;
    }
    if (!(amountLoan % 1000 === 0)) {
      handleEmptyInput(field, "Invalid Amount");
      return;
    }

    is_approved(true);
    setIsOpenApproved(true);
  }

  return (
    <>
      <section className="user__account ">
        <HeaderUser />

        <section className="section__transact">
          <UserTransactionList />
          <InputTransaction
            onDeposit={handleDeposit}
            onWidthdraw={handleWidthdraw}
            onSetLoan={handleLoan}
            onSetInput={handleInput}
          />
          <FormSendMoney
            onSetInput={handleInput}
            onSendMoney={handleSendMoney}
          />
        </section>

        <section className="expense__list">
          <HeaderExpense />
          <ListOfExpenses />
          <FormAddingExpense
            onSetInput={handleInput}
            onSetExpene={handleExpense}
          />
        </section>
        {isOpenApproved && <CalculateLoan onApproved={setIsOpenApproved} />}
      </section>
      ;
    </>
  );
}
