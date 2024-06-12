import { updateTransaction } from "./updateTransaction";

export function updateAccountList(
  state,
  selectedAccount,
  type,
  updatedAccount
) {
  const updateSelectedAccount =
    updatedAccount.find((acc) => acc.id === selectedAccount.id) || null;

  updateTransaction(state, updatedAccount, updateSelectedAccount);
  state[`amount${type.slice(0, 1).toUpperCase() + type.slice(1)}`] = "";
}
