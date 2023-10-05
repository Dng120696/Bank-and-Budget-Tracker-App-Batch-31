function CalculateLoan({ state, dispatch, formatBalance, onApproved }) {
  const { loanTerms, amountLoan } = state;
  const calculateTotalDeduction = Math.round(
    (amountLoan * loanTerms * 1.25) / 1000
  );
  const calculateInterest =
    amountLoan && loanTerms
      ? Math.round(
          amountLoan * (loanTerms === 6 ? 0.16 : loanTerms === 12 ? 0.28 : 0.48)
        )
      : "N/A";
  const totalAmountReceived = loanTerms
    ? amountLoan - calculateTotalDeduction
    : "N/A";
  const totalLoan = +amountLoan + +calculateInterest;

  return (
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md w-[95%] h-[32rem] shadow-[0_0_1rem_rgba(0,0,0,0.3)] bg-white z-50 py-12 px-8">
      <div className="loan__calculate px-4 py-6 mb-8 rounded-md">
        <div className="grid grid-cols-2 text-2xl mb-4 w-[30%]">
          <i
            className="fa-solid fa-xmark absolute right-12 top-10 text-4xl hover:cursor-pointer hover:text-gray-500"
            onClick={() => {
              dispatch({ type: "REJECT" });
              dispatch({ type: "IS_APPROVED", payload: false });
              onApproved(false);
            }}
          ></i>
          <p className="text-gray-500 font-bold ">Principal Loan:</p>

          <p className="text-green-600 font-bold text-4xl mb-4">
            {formatBalance.format(amountLoan)}
          </p>
          <p className="text-2xl text-gray-500 font-bold mr-2">Loan Terms:</p>
          <select
            value={loanTerms}
            className=" text-xl  border p-2  text-center"
            onChange={(e) =>
              dispatch({
                type: "SET_LOAN-TERMS",
                payload: +e.target.value,
              })
            }
          >
            <option value="" disabled>
              Select Terms
            </option>
            <option value={6}>6 months</option>
            <option value={12}>12 months / 1 year</option>
            <option value={24}>24 months /2 year</option>
          </select>
        </div>
        <div className="grid grid-cols-[1fr,1.2fr] mb-4">
          <p className="text-[1.8rem] text-gray-900 font-bold">
            Calculate Loan{" "}
            <span className="text-lg">(Principal Loan * Interest Rate)</span>
          </p>
          <p
            className="text-[1.8rem] text-gray-900 font-bold
          "
          >
            Calculate Insurance{" "}
            <span className="text-lg">
              ((Principal Loan * Loan Terms) * 1.25% /1000)
            </span>
          </p>
        </div>
        <div className="grid grid-cols-[1fr,1.25fr] text-xl gap-x-6 gap-y-2">
          <div className="grid grid-cols-[1.5fr,1fr] text-2xl gap-x-6 gap-y-2">
            <p className="text-gray-500 font-bold">
              Interest Rate in {loanTerms} months:
            </p>
            <p>{`${
              loanTerms === 6
                ? "16%"
                : loanTerms === 12
                ? "28%"
                : loanTerms === 24
                ? "48%"
                : "N/A"
            }`}</p>
            <p className="text-gray-500 font-bold">Total Interest:</p>
            <p className="text-green-600">
              {amountLoan && loanTerms
                ? formatBalance.format(calculateInterest)
                : "N/A"}
            </p>

            <p className="text-gray-500 font-bold">Total Loan:</p>
            <p
              className={`${
                loanTerms ? "text-green-600 font-bold underline" : ""
              }`}
            >
              {loanTerms ? formatBalance.format(totalLoan) : "N/A"}
            </p>
          </div>

          {/* <p>Monthly Payment in {loanTerms} months:</p>
          <p>{`${
            amountLoan && loanTerms
              ? formatBalance.format(Math.round(totalLoan / loanTerms))
              : "N/A"
          }
           `}</p> */}
          <div className="grid grid-cols-[1.5fr,1fr] text-2xl gap-x-6 gap-y-2">
            <p className="text-gray-500 font-bold">Loan Insurance:</p>
            <p>1.25%</p>
            <p className="text-gray-500 font-bold">
              Total Deduction from Loan:
            </p>
            <p className={amountLoan && loanTerms ? "text-red-600" : ""}>
              {amountLoan && loanTerms
                ? formatBalance.format(calculateTotalDeduction)
                : "N/A"}
            </p>
            <p className="text-gray-500 font-bold">Total Amount to Receive:</p>
            <p
              className={loanTerms ? "text-green-600 font-bold underline" : ""}
            >
              {loanTerms ? formatBalance.format(totalAmountReceived) : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-6 items-center justify-center ">
        <button
          className="rounded-md  py-3 px-12 bg-blue-500 text-xl text-white font-bold "
          onClick={() => {
            if (!loanTerms || !amountLoan) return;
            dispatch({ type: "LOAN" });
            dispatch({ type: "IS_APPROVED", payload: false });

            onApproved(false);
          }}
        >
          Approved
        </button>
        <button
          className=" rounded-md py-3 px-12 bg-red-500 text-xl text-white font-bold "
          onClick={() => {
            dispatch({ type: "IS_APPROVED", payload: false });
            dispatch({ type: "REJECT" });

            onApproved(false);
          }}
        >
          Reject
        </button>
      </div>
    </section>
  );
}

export default CalculateLoan;
