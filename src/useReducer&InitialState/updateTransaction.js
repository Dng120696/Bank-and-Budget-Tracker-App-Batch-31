import { storeToLocalStorage } from "./storeToLocalStorage";

export function updateTransaction(
  state,
  updatedAccount,
  updateSelectedAccount
) {
  const getAllTransaction = updatedAccount.flatMap((acc) => [
    ...acc.userTransactionHistory,
    ...acc.expenseList,
  ]);

  storeToLocalStorage(updatedAccount, updateSelectedAccount, getAllTransaction);

  return {
    ...state,
    allTransactionHistory: getAllTransaction,
    accountList: updatedAccount,
    filteredAccount: updatedAccount,
    selectedAccount: updateSelectedAccount,
  };
}
