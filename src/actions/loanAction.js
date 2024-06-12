import { updateTransaction } from "../helper/updateTransaction";

export const loanTransaction = (set) => () => {
  set((state) => {
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
      interestRate: loanTerms === 6 ? "16%" : loanTerms === 12 ? "28%" : "48%",
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
    updateTransaction(state, updatedAccount, updateSelectedAccount);
    state.amountLoan = "";
    state.loanTerms = "";
  });
};
