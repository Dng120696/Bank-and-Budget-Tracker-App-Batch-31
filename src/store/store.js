import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { initialState } from "./initialState";
import { loginFail, loginSuccess, loginInvalid } from "../actions/loginActions";
import { createAccount } from "../actions/createAccountAction";
import { setLocalStorage } from "../utils/setLocalStorage";
import { updateTransaction } from "../helper/updateTransaction";
import { setInput, validateInput } from "../actions/inputActions";
import { handleTransaction } from "../helper/handleTransaction";
import { loanTransaction } from "../actions/loanAction";
import { sendMoneyTransaction } from "../actions/sendMoneyAction";

const useStore = create(
  immer((set) => ({
    ...initialState,
    login_fail: loginFail(set),
    login_success: loginSuccess(set),
    login_invalid: loginInvalid(set),
    set_input: setInput(set),
    validate_input: validateInput(set),
    create_account: createAccount(set),
    search_account: (query) =>
      set((state) => {
        const { accountList } = state;
        const paramQuery = query.toLowerCase();

        const filteredAccount = query
          ? accountList.filter((acc) =>
              acc.firstName.toLowerCase().includes(paramQuery)
            )
          : accountList;

        setLocalStorage("filteredAccount", filteredAccount);

        state.filteredAccount = filteredAccount;
      }),
    delete_account: (acc_id) =>
      set((state) => {
        const { accountList, selectedAccount } = state;

        const updateAccount = accountList.filter((acc) => acc.id !== acc_id);
        const updateSelectedAccount =
          selectedAccount?.id === acc_id ? null : selectedAccount;

        updateTransaction(state, updateAccount, updateSelectedAccount);
      }),
    selected_account: (acc) =>
      set((state) => {
        setLocalStorage("selectedAccount", acc);
        state.selectedAccount = acc;
        state.isOpenDetails = !state.isOpenDetails;
      }),
    close_account_details: (params) =>
      set((state) => {
        state.isOpenDetails = params;
        state.isOpen = params;
      }),
    set_modal: (params) =>
      set((state) => {
        state.isOpen = params;
      }),
    withdraw: () => set((state) => handleTransaction(state, "widthdraw")),
    deposit: () => set((state) => handleTransaction(state, "deposit")),
    loan: loanTransaction(set),
    send_money: sendMoneyTransaction(set),
    is_approved: (params) =>
      set((state) => {
        state.isApproved = params;
      }),
    reject: () =>
      set((state) => {
        state.amountLoan = "";
        state.loanTerms = "";
      }),
    set_loan_terms: (params) =>
      set((state) => {
        state.loanTerms = params;
      }),
    update_expenses: (input, id) =>
      set((state) => {
        const { selectedAccount, accountList } = state;
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

        updateTransaction(state, updatedAccount, updateSelectedAccount);
        state.editExpenseName = input;
      }),
    edit_expense_name: (expense_id) =>
      set((state) => {
        const { selectedAccount, accountList } = state;

        const updateExpense = selectedAccount.expenseList.map((expense) =>
          expense.id === expense_id
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

        updateTransaction(state, updatedAccount, updateSelectedAccount);
      }),
    submit_edited_expense: (expense_id) =>
      set((state) => {
        const { selectedAccount, accountList } = state;
        const updateExpense = selectedAccount.expenseList.map((expense) =>
          expense.id === expense_id
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

        updateTransaction(state, updatedAccount, updateSelectedAccount);
        state.editExpenseName = "";
      }),
    create_expense: () =>
      set((state) => {
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
        updateTransaction(state, updatedAccount, updateSelectedAccount);
        state.expenseName = "";
        state.expenseAmount = "";
      }),
    delete_expense: (expense_id) =>
      set((state) => {
        const { selectedAccount, accountList } = state;
        const updateExpenseList = selectedAccount.expenseList.filter(
          (expense) => expense.id !== expense_id
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

        updateTransaction(state, updatedAccount, updateSelectedAccount);
      }),
  }))
);

export default useStore;
