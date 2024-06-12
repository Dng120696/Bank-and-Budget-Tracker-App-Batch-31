import logo from "../assets/dashboardimg.png";
import widthdrawLogo from "../assets/withdraw.png";
import depositLogo from "../assets/deposit.png";
import loanLogo from "../assets/loan.png";
import { optionDateFormat } from "../utils/option";
import { formatBalance } from "../utils/formatBalance";
import useStore from "../store/store";

function Dashboard() {
  const state = useStore();
  const transactionTypes = ["widthdraw", "deposit", "loan"];

  const summary = transactionTypes.reduce((acc, type) => {
    const totalAmount = state?.allTransactionHistory
      .filter((transact) => transact.type === type)
      .reduce((sum, transact) => sum + +transact.amount, 0);

    return { ...acc, [type]: totalAmount };
  }, {});

  const { widthdraw, deposit, loan } = summary;

  const sortedTransactions = [...state.allTransactionHistory].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB - dateA;
  });

  return (
    <section className=" dashboard__section">
      <div className="dashboard">
        <div className="p-10 flex items-center justify-center gap-10 lg:gap-24 flex-col-reverse lg:flex-row shadow-[0_0_10px_rgba(0,0,0,.1)]  mb-8 rounded-2xl bg-blue-600 text-gray-100">
          <div>
            <h1 className="text-4xl lg:text-5xl mb-6 font-bold tracking-[3px]">
              Welcome Back!
            </h1>
            <p className="text-[1.4rem]  tracking-[1px] indent-10 text-justify leading-[1.8]">
              As the admin, you have the authority to manage accounts and
              transactions. Your role is crucial in ensuring the bank operates
              smoothly. If you need any assistance, feel free to reach out.
              We&apos;re here to help you succeed!
            </p>
          </div>

          <img src={logo} alt="logo" className="w-72 " />
        </div>

        <div className=" mb-8 w-full grid grid-cols-1  lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.2)] h-full rounded-xl p-8 flex items-center justify-between ">
            <p>
              <span className="text-gray-600 font-bold text-2xl">
                Total Widthdraw
              </span>
              <span className="text-red-600 font-bold block mt-4 text-4xl">
                {formatBalance?.format(widthdraw)}
              </span>
            </p>
            <img src={widthdrawLogo} alt="widthdraw" className="w-32" />
          </div>
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.2)] h-full rounded-xl p-8 flex items-center justify-between">
            <p>
              <span className="text-gray-600 font-bold text-2xl">
                Total Deposit
              </span>
              <span className="text-green-600 font-bold block mt-4 text-4xl">
                {formatBalance?.format(deposit)}
              </span>
            </p>
            <img src={depositLogo} alt="widthdraw" className="w-32" />
          </div>
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.2)] h-full rounded-xl p-8 flex items-center justify-between">
            <p>
              <span className="text-gray-600 font-bold text-2xl">
                Total Loan
              </span>
              <span className="text-green-800 font-bold block mt-4 text-4xl">
                {formatBalance?.format(loan)}
              </span>
            </p>
            <img src={loanLogo} alt="widthdraw" className="w-28" />
          </div>
        </div>

        <div className=" shadow-[0_0_10px_rgba(0,0,0,.2)] bg-white ">
          <ul className="grid  grid-cols-[0.5fr,1fr,1fr,0.8fr,1.5fr,0.8fr] bg-blue-600 text-2xl text-white p-4 ">
            <li>No.</li>
            <li>Account Name</li>
            <li>Expense Name</li>
            <li>Status</li>
            <li>Date</li>
            <li>Amount</li>
          </ul>
          <div className="transaction__box w-full h-[20rem]  rounded-md overflow-y-scroll pl-6 pr-4">
            {state?.allTransactionHistory.length === 0 ? (
              <p className="flex items-center justify-center text-gray-300 font-bold text-2xl h-full">
                No Transaction
              </p>
            ) : (
              sortedTransactions?.map(
                ({ date, name, expenseName, type, amount }, i) => {
                  const newDate = new Date(date);
                  const formatDate = new Intl.DateTimeFormat(
                    "en-PH",
                    optionDateFormat
                  ).format(newDate);
                  return (
                    <ul
                      key={i}
                      className="transaction__list grid grid-cols-[0.5fr,1fr,1fr,0.8fr,1.5fr,0.8fr]"
                    >
                      <li>{i + 1}</li>
                      <li>{name}</li>
                      <li>{expenseName || "N/A"}</li>
                      <li
                        className={
                          type === "widthdraw" ||
                          type === "send" ||
                          type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {type}
                      </li>
                      <li className="text-gray-600">{formatDate}</li>
                      <li
                        className={
                          type === "widthdraw" ||
                          type === "send" ||
                          type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {" "}
                        {type === "widthdraw" ||
                        type === "send" ||
                        type === "expense"
                          ? "-"
                          : "+"}{" "}
                        {formatBalance.format(Number(amount).toFixed(2))}
                      </li>
                    </ul>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
