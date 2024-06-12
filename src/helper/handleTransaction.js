import { updateAccountList } from "./updateAccountList";

export function handleTransaction(state, type) {
  const { amountWidthdraw, amountDeposit, selectedAccount, accountList } =
    state;
  const checkType = type === "widthdraw" ? amountWidthdraw : amountDeposit;
  const newBalance =
    checkType === amountWidthdraw
      ? selectedAccount.initialBalance - +checkType
      : selectedAccount.initialBalance + +checkType;

  const addTransaction = {
    type,
    date: new Date().toISOString(),
    name: selectedAccount.firstName,
    id: selectedAccount.userTransactionHistory.length + 1,
    amount: checkType,
  };

  const updatedAccount = accountList.map((account) =>
    account.id === selectedAccount.id
      ? {
          ...account,
          initialBalance: newBalance,
          userTransactionHistory: [
            addTransaction,
            ...account.userTransactionHistory,
          ],
        }
      : account
  );
  updateAccountList(state, selectedAccount, type, updatedAccount);
}
