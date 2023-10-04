import logo from "../assets/dashboardimg.png";

function Dashboard({ state }) {
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <section className=" dashboard__section">
      <div className="dashboard">
        <div className="p-10 relative shadow-[0_0_10px_rgba(0,0,0,.1)] h-[35%] mb-12">
          <h1 className=" text-5xl mb-6 font-bold">
            Welcome Back <span className=" text-blue-500">Patrick!</span>{" "}
          </h1>
          <p className="text-xl w-[60%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
            labore dolores quod libero. Asperiores incidunt quod rem laborum
            magni ab, ex nam quia excepturi porro nulla doloribus quisquam
            exercitationem, repudiandae itaque ipsum quis assumenda at enim
            maiores laudantium. Quo ipsa fugit numquam asperiores saepe alias ad
            optio dignissimos magnam ratione.
          </p>
          <img src={logo} alt="logo" className="w-96 absolute top-0 right-24" />
        </div>
        <div className=" h-[15%] w-full grid grid-cols-3 gap-10 mb-12">
          <div className="shadow-[0_0_10px_rgba(0,0,0,.1)] h-full">
            Total Widthdraw ,Expense and Send Money
          </div>
          <div className="shadow-[0_0_10px_rgba(0,0,0,.1)] h-full">
            Total Deposit and Receive
          </div>
          <div className="shadow-[0_0_10px_rgba(0,0,0,.1)] h-full">
            Total Loan
          </div>
        </div>

        <div className=" shadow-[0_0_10px_rgba(0,0,0,.1)] ">
          <ul className="grid grid-cols-[0.5fr,1.25fr,1.25fr,1fr,1.5fr,1fr] bg-[#4573ff] text-2xl text-white p-4 ">
            <li>No.</li>
            <li>Account Name</li>
            <li>Expene Name</li>
            <li>Status</li>
            <li>Date</li>
            <li>Amount</li>
          </ul>
          <div className="transaction__box w-full h-[20rem]  rounded-md overflow-y-scroll pl-6 pr-4">
            {state?.allTransactionHistory.map(
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
