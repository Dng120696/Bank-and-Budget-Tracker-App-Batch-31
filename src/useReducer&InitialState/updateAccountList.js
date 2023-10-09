import { updateTransaction } from "./updateTransaction";

export function updateAccountList(
  state,
  selectedAccount,
  type,
  updatedAccount
) {
  const updateSelectedAccount =
    updatedAccount.find((acc) => acc.id === selectedAccount.id) || null;

  return {
    ...updateTransaction(state, updatedAccount, updateSelectedAccount),
    [`amount${type.slice(0, 1).toUpperCase() + type.slice(1)}`]: "",
  };
}
