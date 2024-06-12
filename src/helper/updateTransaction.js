import { localStorageUpdateAccount } from "./localStorageUpdateAccount";

export function updateTransaction(
  state,
  updatedAccount,
  updateSelectedAccount
) {
  const getAllTransaction = updatedAccount.flatMap((acc) => [
    ...acc.userTransactionHistory,
    ...acc.expenseList,
  ]);

  localStorageUpdateAccount(
    updatedAccount,
    updateSelectedAccount,
    getAllTransaction
  );

  state.allTransactionHistory = getAllTransaction;
  state.accountList = updatedAccount;
  state.filteredAccount = updatedAccount;
  state.selectedAccount = updateSelectedAccount;
}
