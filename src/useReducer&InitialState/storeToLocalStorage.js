export function storeToLocalStorage(
  updateAccount,
  updateSelectedAccount,
  getAllTransaction
) {
  localStorage.setItem("account", JSON.stringify(updateAccount));
  localStorage.setItem("filteredAccount", JSON.stringify(updateAccount));
  localStorage.setItem(
    "selectedAccount",
    JSON.stringify(updateSelectedAccount)
  );
  localStorage.setItem(
    "allTransactionHistory",
    JSON.stringify(getAllTransaction)
  );
}
