function UserTransactionList({ state, formatBalance }) {
  return (
    <div className="user__transaction">
      <ul className="header__transaction">
        <li className="justify-self-center ml-4">No.</li>
        <li className="justify-self-center">Status</li>
        <li className="justify-self-center ">Date</li>
        <li className="justify-self-end mr-6">Amount</li>
      </ul>
      <div>
        {state.selectedAccount?.userTransactionHistory.length === 0 ? (
          <p className=" ">Add Transaction</p>
        ) : (
          state.selectedAccount?.userTransactionHistory.map(
            ({ date, id, type, amount }, i) => {
              const transactionTypes = {
                widthdraw: "widthdraw",
                send: "send",
                received: "received",
                deposit: "deposit",
                deduct: "deduct",
                loan: "loan",
              };

              return (
                <ul key={i} className="user-transaction__history">
                  <li className="text-gray-600 text-xl">{id}</li>

                  <li
                    className={` text-xl capitalize font-bolds pl-8 font-bold ${
                      type === "widthdraw" || type === "send"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transactionTypes[type] || ""}
                  </li>
                  <li className="text-lg text-gray-400 pl-4">{date}</li>

                  <li
                    className={` text-xl justify-self-end self-end font-bold ${
                      type === "widthdraw" || type === "send"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {type === "widthdraw" || type === "send" ? "-" : "+"}{" "}
                    {formatBalance.format(Number(amount).toFixed(2))}
                  </li>
                </ul>
              );
            }
          )
        )}
      </div>
    </div>
  );
}

export default UserTransactionList;
