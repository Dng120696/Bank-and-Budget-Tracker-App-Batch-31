import { initialStateTransaction } from "./initialStateTransaction";

const optionTransact = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const generatePassword = (lastname, date) => {
  const dateObject = new Date(date);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${lastname}${month}${day}${year}`;
};

const createAccount = (state) => {
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
    isAddAcc: false,
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

export function reducerTransaction(state, action) {
  switch (action.type) {
    case "SET_INPUT": {
      const { name, input } = action.payload;
      return {
        ...state,
        [name]: input,
        [`${name}Error`]: "",
        [`is${name}Error`]: false,
      };
    }
    case "EMPTY_INPUT": {
      const { field, message } = action.payload;
      return {
        ...state,
        [`${field}Error`]: message,
        [`is${field}Error`]: true,
      };
    }
    case "NOT_STARTWITHNUMBER": {
      const { field, message } = action.payload;
      return {
        ...state,
        [`${field}Error`]: message,
        [`is${field}Error`]: true,
      };
    }
    case "CREATE_ACCOUNT":
      return createAccount(state);
    case "ADD_ACCOUNT":
      return { ...state, isAddAcc: !state.isAddAcc };
    case "DELETE_ACCOUNT": {
      const updateAccount = state.accountList.filter(
        (acc) => acc.id !== action.payload
      );
      localStorage.setItem("account", JSON.stringify(updateAccount));

      return { ...state, accountList: updateAccount };
    }
    case "SELECTED_ACCOUNT": {
      localStorage.setItem("selectedAccount", JSON.stringify(action.payload));
      return { ...state, selectedAccount: action.payload };
    }
    case "GET_ACCOUNTID":
      return { ...state, [action.payload.field]: action.payload.input };
    case "AMOUNT":
      return { ...state, [action.payload.field]: action.payload.input };
    case "WIDTHDRAW": {
      const withdrawalAmount = state.amountWidthdraw;
      const selectedAccount = state.selectedAccount;
      const newBalance = +selectedAccount.initialBalance - +withdrawalAmount;

      const widthdrawTransaction = {
        type: "widthdraw",
        date: new Intl.DateTimeFormat("en-PH", optionTransact).format(
          new Date()
        ),
        name: selectedAccount.firstName,
        id: state.selectedAccount.userTransactionHistory.length + 1,
        amount: withdrawalAmount,
      };

      const updatedAccounts = state.accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                ...state.selectedAccount.userTransactionHistory,
                widthdrawTransaction,
              ],
            }
          : account
      );

      return {
        ...state,
        accountList: updatedAccounts,
        selectedAccount: {
          ...selectedAccount,
          initialBalance: newBalance,
          userTransactionHistory: [
            widthdrawTransaction,
            ...state.selectedAccount.userTransactionHistory,
          ],
        },
        amountWidthdraw: "",
      };
    }
    case "DEPOSIT": {
      const depositAmount = state.amountDeposit;
      const selectedAccount = state.selectedAccount;
      const newBalance = +selectedAccount.initialBalance + +depositAmount;

      const depositTransaction = {
        type: "deposit",
        date: new Intl.DateTimeFormat("en-PH", optionTransact).format(
          new Date()
        ),
        name: selectedAccount.firstName,
        id: state.selectedAccount.userTransactionHistory.length + 1,
        amount: depositAmount,
      };

      const updatedAccounts = state.accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                depositTransaction,
                ...state.selectedAccount.userTransactionHistory,
              ],
            }
          : account
      );

      return {
        ...state,
        accountList: updatedAccounts,
        selectedAccount: {
          ...selectedAccount,
          initialBalance: newBalance,
          userTransactionHistory: [
            depositTransaction,
            ...state.selectedAccount.userTransactionHistory,
          ],
        },
        amountDeposit: "",
      };
    }
    case "RECEIVER_ID":
      return { ...state, receiverId: action.payload };
    case "SENDER_ID":
      return { ...state, senderId: action.payload };
    case "SEND_MONEY": {
      const receiver = state.accountList.find(
        (acc) => acc.id === state.receiverId
      );

      const newBalanceReceiver = +receiver.initialBalance + +state.senderAmount;
      const selectedAccount = state.selectedAccount;
      const newBalance = +selectedAccount.initialBalance - +state.senderAmount;

      const sendingTransaction = {
        type: "send",
        date: new Intl.DateTimeFormat("en-PH", optionTransact).format(
          new Date()
        ),
        name: selectedAccount.name,
        id: state.selectedAccount.userTransactionHistory.length + 1,
        amount: state.senderAmount,
      };
      const receivedTransaction = {
        type: "received",
        date: new Intl.DateTimeFormat("en-PH", optionTransact).format(
          new Date()
        ),
        name: receiver.name,
        id: receiver.userTransactionHistory.length + 1,
        amount: state.senderAmount,
      };

      const updatedAccounts = state.accountList.map((account) =>
        account.id === receiver.id
          ? {
              ...account,
              initialBalance: newBalanceReceiver,
              userTransactionHistory: [
                receivedTransaction,
                ...receiver.userTransactionHistory,
              ],
            }
          : account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                sendingTransaction,
                ...state.selectedAccount.userTransactionHistory,
              ],
            }
          : account
      );

      return {
        ...state,
        accountList: updatedAccounts,
        selectedAccount: {
          ...selectedAccount,
          initialBalance: newBalance,
          userTransactionHistory: [
            ...state.selectedAccount.userTransactionHistory,
            sendingTransaction,
          ],
        },
        receiverId: "",
        senderId: "",
        senderAmount: "",
      };
    }
    case "EXPENSE_NAME":
      return { ...state, expenseName: action.payload };
    case "INPUT_EXPENSE": {
      const updateExpenseName = state.selectedAccount.expenseList.map(
        (expense) =>
          expense.id === action.payload
            ? { ...expense, name: action.payload }
            : expense
      );
      console.log(updateExpenseName);
      return {
        ...state,
        selectedAccount: {
          ...state.selectedAccount,
          expenseList: updateExpenseName,
        },
      };
    }
    case "EDIT_EXPENSE-NAME": {
      return { ...state, isEdit: !state.isEdit };
    }
    case "EXPENSE_ITEM": {
      const addItem = {
        name: state.expenseName,
        amount: state.expenseAmount,
        date: new Intl.DateTimeFormat("en-PH", optionTransact).format(
          new Date()
        ),
        id: state.selectedAccount.expenseList.length + 1,
      };
      const newBalance =
        +state.selectedAccount.initialBalance - state.expenseAmount;

      const updatedAccounts = state.accountList.map((account) =>
        account.id === state.selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              expenseList: [...state.selectedAccount.expenseList, addItem],
            }
          : account
      );

      return {
        ...state,
        accountList: updatedAccounts,
        selectedAccount: {
          ...state.selectedAccount,
          initialBalance: newBalance,
          expenseList: [...state.selectedAccount.expenseList, addItem],
        },
        expenseName: "",
        expenseAmount: "",
      };
    }
    case "DELETE_EXPENSE": {
      const updateExpenseList = state.selectedAccount.expenseList.filter(
        (expense) => expense.id !== action.payload
      );
      console.log(updateExpenseList);
      return {
        ...state,
        selectedAccount: {
          ...state.selectedAccount,
          expenseList: updateExpenseList,
        },
      };
    }
    default:
      return initialStateTransaction;
  }
}
