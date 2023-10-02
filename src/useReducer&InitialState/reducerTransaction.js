import { initialStateTransaction } from "./initialStateTransaction";

export function reducerTransaction(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.payload.name]: action.payload.input };
    case "CREATE_ACCOUNT": {
      const generatePassword = (lastname, date) => {
        const dateObject = new Date(date);
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const year = dateObject.getFullYear();
        return `${lastname}${month}${day}${year}`;
      };
      const newAccount = {
        firstName: state.accountHolderFirstName,
        lastName: state.accountHolderLastName,
        initialBalance: state.accountInitialBalance,
        email: state.email,
        birthDate: state.birthDate,
        password: generatePassword(
          state.accountHolderLastName,
          state.birthDate
        ),
        id: Date.now(),
        userTransactionHistory: [],
        expenseList: [],
      };
      return {
        ...state,
        accountList: [...state.accountList, newAccount],
        accountHolderFirstName: "",
        accountHolderLastName: "",
        accountInitialBalance: "",
        birthDate: "",
        email: "",
        isAddAcc: false,
      };
    }
    case "ADD_ACCOUNT":
      return { ...state, isAddAcc: !state.isAddAcc };
    case "DELETE_ACCOUNT": {
      const updateAccount = state.accountList.filter(
        (acc) => acc.id !== action.payload
      );
      console.log(updateAccount);
      return { ...state, accountList: updateAccount };
    }
    case "SELECTED_ACCOUNT": {
      return { ...state, selectedAccount: action.payload };
    }
    case "GET_ACCOUNTID":
      return { ...state, [action.payload.field]: action.payload.input };
    case "AMOUNT":
      return { ...state, [action.payload.field]: action.payload.input };
    case "WIDTHDRAW": {
      const withdrawalAmount = state.amountWidthdraw;
      const selectedAccount = state.selectedAccount;
      const newBalance = selectedAccount.initialBalance - withdrawalAmount;
      const widthdrawTransaction = {
        type: "widthdraw",
        name: selectedAccount.name,
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
            ...state.selectedAccount.userTransactionHistory,
            widthdrawTransaction,
          ],
        },
        amountWidthdraw: "",
      };
    }
    case "DEPOSIT": {
      const depositAmount = state.amountDeposit;
      const selectedAccount = state.selectedAccount;
      const newBalance = selectedAccount.initialBalance + depositAmount;
      const depositTransaction = {
        type: "deposit",
        name: selectedAccount.name,
        id: state.selectedAccount.userTransactionHistory.length + 1,
        amount: depositAmount,
      };
      const updatedAccounts = state.accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                ...state.selectedAccount.userTransactionHistory,
                depositTransaction,
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
            depositTransaction,
          ],
        },
        amountDeposit: "",
      };
    }
    case "RECEIVER_ID":
      return { ...state, receiverId: action.payload };
    case "SEND_MONEY": {
      const receiver = state.accountList.find(
        (acc) => acc.id === state.receiverId
      );

      const newBalanceReceiver = +receiver.initialBalance + state.senderAmount;
      const selectedAccount = state.selectedAccount;
      const newBalance = +selectedAccount.initialBalance - state.senderAmount;
      const sendingTransaction = {
        type: "send",
        name: selectedAccount.name,
        id: state.selectedAccount.userTransactionHistory.length + 1,
        amount: state.senderAmount,
      };
      const receivedTransaction = {
        type: "received",
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
                ...receiver.userTransactionHistory,
                receivedTransaction,
              ],
            }
          : account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                ...state.selectedAccount.userTransactionHistory,
                sendingTransaction,
              ],
            }
          : account
      );
      console.log(updatedAccounts);

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
        senderAmount: "",
      };
    }
    case "EXPENSE_NAME":
      return { ...state, expenseName: action.payload };
    case "EXPENSE_ITEM": {
      const addItem = {
        name: state.expenseName,
        amount: state.expenseAmount,
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
    default:
      return initialStateTransaction;
  }
}
