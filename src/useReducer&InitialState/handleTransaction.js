import { updateAccountList } from "./updateAccountList";

export function handleTransaction(state, type) {
  const { amountWidthdraw, amountDeposit, selectedAccount } = state;
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
  console.log(addTransaction);
  const updatedAccount = state.accountList.map((account) =>
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
  return updateAccountList(state, selectedAccount, type, updatedAccount);
}
