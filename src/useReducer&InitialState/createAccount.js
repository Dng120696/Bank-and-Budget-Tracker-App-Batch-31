import { generatePassword, optionTransact } from "./reducerTransaction";

export const createAccount = (state) => {
  const newAccount = {
    firstName: state.accountHolderFirstName,
    lastName: state.accountHolderLastName,
    initialBalance: state.accountInitialBalance,
    email: state.email,
    birthDate: state.birthDate,
    password: generatePassword(state.accountHolderLastName, state.birthDate),
    id: String(Date.now()),
    date: new Intl.DateTimeFormat("en-PH", optionTransact).format(new Date()),
    userTransactionHistory: [],
    expenseList: [],
    loanList: [],
  };

  const updatedAccountList = [...state.accountList, newAccount];

  localStorage.setItem("account", JSON.stringify(updatedAccountList));

  return {
    ...state,
    accountList: updatedAccountList,
    accountHolderFirstName: "",
    accountHolderLastName: "",
    accountInitialBalance: "",
    birthDate: "",
    email: "",
    isOpen: false,
    isaccountHolderFirstNameError: false,
    isaccountHolderLastNameError: false,
    isaccountInitialBalanceError: false,
    isemailError: false,
    isbirthDateError: false,
    accountHolderFirstNameError: "",
    accountHolderLastNameError: "",
    accountInitialBalanceError: "",
    birtDateError: "",
    emailError: "",
  };
};
