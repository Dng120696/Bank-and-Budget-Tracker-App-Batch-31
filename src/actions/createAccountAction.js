import { optionDateFormat } from "../utils/option";
import { generatePassword } from "../utils/generatePassword";

export const createAccount = (set) => () => {
  const capitalizeFirstLetter = (text) =>
    text
      .split(" ")
      .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1))
      .join(" ");

  set((state) => {
    const newAccount = {
      firstName: capitalizeFirstLetter(state.accountHolderFirstName),
      lastName: capitalizeFirstLetter(state.accountHolderLastName),
      initialBalance: state.accountInitialBalance,
      email: state.email,
      birthDate: state.birthDate,
      password: generatePassword(state.accountHolderLastName, state.birthDate),
      id: String(Date.now()),
      date: new Intl.DateTimeFormat("en-PH", optionDateFormat).format(
        new Date()
      ),
      userTransactionHistory: [],
      expenseList: [],
      loanList: [],
    };

    const updatedAccountList = [...state.accountList, newAccount];

    localStorage.setItem("account", JSON.stringify(updatedAccountList));
    localStorage.setItem("filteredAccount", JSON.stringify(updatedAccountList));

    state.accountList = updatedAccountList;
    state.filteredAccount = updatedAccountList;
    state.accountHolderFirstName = "";
    state.accountHolderLastName = "";
    state.accountInitialBalance = "";
    state.birthDate = "";
    state.email = "";
    state.isOpen = false;
    state.isaccountHolderFirstNameError = false;
    state.isaccountHolderLastNameError = false;
    state.isaccountInitialBalanceError = false;
    state.isemailError = false;
    state.isbirthDateError = false;
    state.accountHolderFirstNameError = "";
    state.accountHolderLastNameError = "";
    state.accountInitialBalanceError = "";
    state.birtDateError = "";
    state.emailError = "";
  });
};
