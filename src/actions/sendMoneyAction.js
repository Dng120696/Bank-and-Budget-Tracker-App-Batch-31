import { updateTransaction } from "../helper/updateTransaction";

export const sendMoneyTransaction = (set) => () => {
  set((state) => {
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

    updateTransaction(state, updatedAccount, updateSelectedAccount);
    state.receiverId = "";
    state.senderId = "";
    state.senderAmount = "";
  });
};
