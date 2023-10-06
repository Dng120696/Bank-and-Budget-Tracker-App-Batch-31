import logo from "../assets/dashboardimg.png";

function Dashboard({ state, formatBalance }) {
  const transactionTypes = ["widthdraw", "deposit", "loan"];

  const summary = transactionTypes.reduce((acc, type) => {
    const totalAmount = state.allTransactionHistory
      .filter((transact) => transact.type === type)
      .reduce((sum, transact) => sum + +transact.amount, 0);

    return { ...acc, [type]: totalAmount };
  }, {});

  const { widthdraw, deposit, loan } = summary;
  return (
    <section className=" dashboard__section">
      <div className="dashboard">
        <div className="p-10 relative shadow-[0_0_10px_rgba(0,0,0,.1)] h-[30%] mb-12   rounded-2xl bg-blue-600">
          <h1 className=" text-5xl mb-6 font-bold  text-gray-100">
            Welcome Back <span className=" text-white">Patrick!</span>{" "}
          </h1>
          <p className="text-[1.4rem] w-[60%] text-gray-100 tracking-[1px] indent-10 text-justify leading-[1.8]">
            As the admin, you have the authority to manage accounts and
            transactions. Your role is crucial in ensuring the bank operates
            smoothly. If you need any assistance, feel free to reach out.
            We&apos;re here to help you succeed!
          </p>
          <img src={logo} alt="logo" className="w-80 absolute top-0 right-24" />
        </div>
        <div className=" h-[15%] w-full grid grid-cols-3 gap-10 mb-12">
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.1)] h-full rounded-xl p-8 ">
            <p>
              <span className="text-gray-600 font-bold text-xl">
                Total Widthdraw
              </span>
              <span className="text-red-500 font-bold block mt-4 text-4xl">
                {formatBalance.format(widthdraw)}
              </span>
            </p>
          </div>
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.1)] h-full rounded-xl p-8 ">
            <p>
              <span className="text-gray-600 font-bold text-xl">
                Total Deposit
              </span>
              <span className="text-green-600 font-bold block mt-4 text-4xl">
                {formatBalance.format(deposit)}
              </span>
            </p>
          </div>
          <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,.1)] h-full rounded-xl p-8 ">
            <p>
              <span className="text-gray-600 font-bold text-xl">
                Total Loan
              </span>
              <span className="text-green-800 font-bold block mt-4 text-4xl">
                {formatBalance.format(loan)}
              </span>
            </p>
          </div>
        </div>

        <div className=" shadow-[0_0_10px_rgba(0,0,0,.1)] bg-white ">
          <ul className="grid grid-cols-[0.5fr,1.25fr,1.25fr,1fr,1.5fr,1fr] bg-blue-600 text-2xl text-white p-4 ">
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
              state?.allTransactionHistory.map(
                ({ date, name, expenseName, type, amount }, i) => (
                  <ul
                    key={i}
                    className="transaction__list grid grid-cols-[0.5fr,1.25fr,1.25fr,1fr,1.5fr,1fr]"
                  >
                    <li>{i + 1}</li>
                    <li>{name}</li>
                    <li>{expenseName || "N/A"}</li>
                    <li
                      className={
                        type === "widthdraw" ||
                        type === "send" ||
                        type === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {type}
                    </li>
                    <li>{date}</li>
                    <li
                      className={
                        type === "widthdraw" ||
                        type === "send" ||
                        type === "expense"
                          ? "text-red-500"
                          : "text-green-500"
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
                )
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
