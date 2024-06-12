import useStore from "../store/store";
import { formatBalance } from "../utils/formatBalance";

function CalculateLoan({ onApproved }) {
  const state = useStore();
  const { loanTerms, amountLoan, reject, is_approved, set_loan_terms, loan } =
    state;

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
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md w-[95%] h-[32rem] shadow-[0_0_1rem_rgba(0,0,0,0.3)] bg-white z-[50] py-12 px-8 ">
      <div className="loan__calculate px-4 py-6 mb-8 rounded-md">
        <div className="grid grid-cols-2 md:text-xl xl:text-2xl mb-4 w-[30%]">
          <i
            className="fa-solid fa-xmark absolute right-12 top-10 text-4xl hover:cursor-pointer hover:text-gray-400"
            onClick={() => {
              reject();
              is_approved(false);
              onApproved(false);
            }}
          ></i>
          <p className="text-gray-400 font-bold ">Principal Loan</p>

          <p className="text-green-600 font-bold text-4xl mb-4">
            {formatBalance.format(amountLoan)}
          </p>
          <p className="md:text-xl xl:text-2xl text-gray-400 font-bold mr-2">
            Loan Terms
          </p>
          <select
            value={loanTerms}
            className=" text-xl  border p-2  text-center"
            onChange={(e) => set_loan_terms(+e.target.value)}
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
          <p className="md:text-2xl xl:text-3xl text-gray-900 font-bold">
            Calculate Loan{" "}
            <span className="text-lg">(Principal Loan * Interest Rate)</span>
          </p>
          <p
            className="md:text-2xl xl:text-3xl  text-gray-900 font-bold
          "
          >
            Calculate Insurance{" "}
            <span className="text-lg">
              ((Principal Loan * Loan Terms) * 1.25% )
            </span>
          </p>
        </div>
        <div className="grid grid-cols-[1fr,1.25fr] gap-x-6 gap-y-2">
          <div className="grid grid-cols-[1.5fr,1fr] md:text-xl xl:text-2xl gap-x-6 gap-y-2">
            <p className="text-gray-400">Interest Rate in {loanTerms} months</p>
            <p className="text-gray-600 font-bold">{`${
              loanTerms === 6
                ? "16%"
                : loanTerms === 12
                ? "28%"
                : loanTerms === 24
                ? "48%"
                : "N/A"
            }`}</p>
            <p className="text-gray-400 ">Total Interest</p>
            <p
              className={`font-bold text-gray-600 ${
                loanTerms ? "text-green-600" : ""
              }`}
            >
              {loanTerms ? formatBalance.format(calculateInterest) : "N/A"}
            </p>

            <p className="text-gray-400 ">Total Loan</p>
            <p
              className={` font-bold text-gray-600  ${
                loanTerms ? "text-green-600 underline text-2xl" : ""
              }`}
            >
              {loanTerms ? formatBalance.format(totalLoan) : "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-[1.5fr,1fr] md:text-xl xl:text-2xl gap-x-6 gap-y-2">
            <p className="text-gray-400 ">Loan Insurance</p>
            <p className="text-gray-600 font-bold">1.25% / 1000</p>
            <p className="text-gray-400 ">Total Deduction from Loan</p>
            <p
              className={`font-bold text-gray-600 ${
                loanTerms ? "text-red-600" : ""
              }`}
            >
              {amountLoan && loanTerms
                ? formatBalance.format(calculateTotalDeduction)
                : "N/A"}
            </p>
            <p className="text-gray-400 ">Total Amount to Receive</p>
            <p
              className={`font-bold text-gray-600 ${
                loanTerms ? "text-green-600 underline text-2xl" : ""
              }`}
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
            is_approved(false);
            loan();
            onApproved(false);
          }}
        >
          Approved
        </button>
        <button
          className=" rounded-md py-3 px-12 bg-red-500 text-xl text-white font-bold "
          onClick={() => {
            is_approved(false);
            reject();
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
