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
          <p>Add Transaction</p>
        ) : (
          state.selectedAccount?.userTransactionHistory.map(
            ({ date, id, type, amount }, i) => {
              const transactionTypes = {
                widthdraw: "widthdraw",
                send: "send",
                received: "received",
                deposit: "deposit",
                deduct: "deduct",
              };

              return (
                <ul key={i} className="user-transaction__history">
                  <li className="text-gray-600 text-xl">{id}</li>

                  <li
                    className={` text-xl capitalize font-bolds ${
                      type === "widthdraw" || type === "send"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {transactionTypes[type] || ""}
                  </li>
                  <li className="text-md text-gray-400">{date}</li>

                  <li
                    className={` text-xl justify-self-end self-end ${
                      type === "widthdraw" || type === "send"
                        ? "text-red-400"
                        : "text-green-400"
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
