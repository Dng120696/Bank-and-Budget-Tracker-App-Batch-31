import { createAccount } from "./createAccount";
import { handleTransaction } from "./handleTransaction";
import { updateTransaction } from "./updateTransaction";

export const optionTransact = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export function reducerTransaction(state, action) {
  switch (action.type) {
    case "SET_INPUT": {
      const { field, input } = action.payload;
      return {
        ...state,
        [field]: input,
        [`${field}Error`]: "",
        [`is${field}Error`]: false,
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

    case "CREATE_ACCOUNT":
      return createAccount(state);

    case "SEARCH_ACCOUNT": {
      const { accountList } = state;
      const query = action.payload.toLowerCase();

      const filteredAccount = query
        ? accountList.filter((acc) =>
            acc.firstName.toLowerCase().includes(query)
          )
        : accountList;

      localStorage.setItem("filteredAccount", JSON.stringify(filteredAccount));

      return {
        ...state,
        filteredAccount,
      };
    }

    case "DELETE_ACCOUNT": {
      const { accountList, selectedAccount } = state;
      const deletedAccountId = action.payload;

      const updateAccount = accountList.filter(
        (acc) => acc.id !== deletedAccountId
      );
      const updateSelectedAccount =
        selectedAccount?.id === deletedAccountId ? null : selectedAccount;

      return updateTransaction(state, updateAccount, updateSelectedAccount);
    }
    case "SELECTED_ACCOUNT": {
      localStorage.setItem("selectedAccount", JSON.stringify(action.payload));
      return {
        ...state,
        selectedAccount: action.payload,
        isOpenDetails: !state.isOpenDetails,
      };
    }
    case "CLOSE_ACCOUNT-DETAILS":
      return {
        ...state,
        isOpenDetails: action.payload,
        isOpen: action.payload,
      };
    case "CLOSE_MODAL-ACCOUNT":
      return {
        ...state,
        isOpen: action.payload,
      };
    case "OPEN_MODAL-ACCOUNT":
      return {
        ...state,
        isOpen: action.payload,
      };
    case "WIDTHDRAW":
      return handleTransaction(state, "widthdraw");
    case "DEPOSIT": {
      return handleTransaction(state, "deposit");
    }

    case "IS_APPROVED":
      return {
        ...state,
        isApproved: action.payload,
      };
    case "REJECT":
      return {
        ...state,
        amountLoan: "",
        loanTerms: "",
      };
    case "SET_LOAN-TERMS":
      return { ...state, loanTerms: action.payload };
    case "LOAN": {
      const { amountLoan, loanTerms, selectedAccount, accountList } = state;

      const totalDeduction = Math.round((amountLoan * 1.25 * loanTerms) / 1000);
      const loanAmount = amountLoan - totalDeduction;
      const newBalance = +selectedAccount.initialBalance + +loanAmount;
      const calculateInterest =
        amountLoan * (loanTerms === 6 ? 0.16 : loanTerms === 12 ? 0.28 : 0.48);

      const totalLoan = +amountLoan + +calculateInterest;
      const paymentPermonth = totalLoan / loanTerms;
      const loanTransaction = {
        type: "loan",
        date: new Date().toISOString(),
        name: selectedAccount.firstName,
        id: selectedAccount.userTransactionHistory.length + 1,
        amount: loanAmount,
        principalLoan: amountLoan,
        loanTerms,
        paymentPermonth,
        interestRate:
          loanTerms === 6 ? "16%" : loanTerms === 12 ? "28%" : "48%",
        totalInterest: Math.round(calculateInterest),
        totalLoan,
      };

      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              userTransactionHistory: [
                loanTransaction,
                ...account.userTransactionHistory,
              ],
              loanList: [loanTransaction, ...account.loanList],
            }
          : account
      );
      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );
      return {
        ...updateTransaction(state, updatedAccount, updateSelectedAccount),
        amountLoan: "",
        loanTerms: "",
      };
    }
    case "SEND_MONEY": {
      const { accountList, selectedAccount, senderAmount, receiverId } = state;
      const receiver = accountList.find((acc) => acc.id === receiverId);
      const newBalanceReceiver = +receiver.initialBalance + +senderAmount;
      const newBalanceSender = +selectedAccount.initialBalance - +senderAmount;

      const sendingTransaction = {
        type: "send",
        date: new Date().toISOString(),
        name: selectedAccount.firstName,
        id: selectedAccount.userTransactionHistory.length + 1,
        amount: senderAmount,
      };

      const receivedTransaction = {
        type: "received",
        date: new Date().toISOString(),
        name: receiver.firstName,
        id: receiver.userTransactionHistory.length + 1,
        amount: senderAmount,
      };

      const updatedAccount = accountList.map((account) =>
        account.id === receiver.id
          ? {
              ...account,
              initialBalance: newBalanceReceiver,
              userTransactionHistory: [
                receivedTransaction,
                ...account.userTransactionHistory,
              ],
            }
          : account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalanceSender,
              userTransactionHistory: [
                sendingTransaction,
                ...account.userTransactionHistory,
              ],
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );
      return {
        ...updateTransaction(state, updatedAccount, updateSelectedAccount),
        receiverId: "",
        senderId: "",
        senderAmount: "",
      };
    }
    case "INPUT_EXPENSE": {
      const { selectedAccount, accountList } = state;
      const { input, id } = action.payload;
      const updateExpense = selectedAccount.expenseList.map((expense) =>
        expense.id === id ? { ...expense, expenseName: input } : expense
      );

      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              expenseList: updateExpense,
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );

      return {
        ...updateTransaction(state, updatedAccount, updateSelectedAccount),
        editExpenseName: input,
      };
    }
    case "EDIT_EXPENSE-NAME": {
      const { selectedAccount, accountList } = state;

      const updateExpense = selectedAccount.expenseList.map((expense) =>
        expense.id === action.payload
          ? { ...expense, isEdit: !expense.isEdit }
          : expense
      );
      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              expenseList: updateExpense,
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );

      return updateTransaction(state, updatedAccount, updateSelectedAccount);
    }
    case "SUBMIT_EDITED_EXPENSE": {
      const { selectedAccount, accountList } = state;
      const updateExpense = selectedAccount.expenseList.map((expense) =>
        expense.id === action.payload
          ? { ...expense, isEdit: !expense.isEdit }
          : expense
      );
      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              expenseList: updateExpense,
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );

      return {
        ...updateTransaction(state, updatedAccount, updateSelectedAccount),
        editExpenseName: "",
      };
    }
    case "EXPENSE_ITEM": {
      const { selectedAccount, expenseName, expenseAmount, accountList } =
        state;

      const addItem = {
        expenseName: expenseName,
        name: selectedAccount.firstName,
        amount: expenseAmount,
        type: "expense",
        isEdit: false,
        date: new Date().toISOString(),
        id: selectedAccount.expenseList.length + 1,
      };
      const newBalance = +selectedAccount.initialBalance - +expenseAmount;

      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              initialBalance: newBalance,
              expenseList: [addItem, ...account.expenseList],
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );
      return {
        ...updateTransaction(state, updatedAccount, updateSelectedAccount),
        expenseName: "",
        expenseAmount: "",
      };
    }
    case "DELETE_EXPENSE": {
      const { selectedAccount, accountList } = state;
      const updateExpenseList = selectedAccount.expenseList.filter(
        (expense) => expense.id !== action.payload
      );

      const updatedAccount = accountList.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              expenseList: updateExpenseList,
            }
          : account
      );

      const updateSelectedAccount = updatedAccount.find(
        (acc) => acc.id === selectedAccount.id
      );

      return updateTransaction(state, updatedAccount, updateSelectedAccount);
    }
    default:
      return state;
  }
}
