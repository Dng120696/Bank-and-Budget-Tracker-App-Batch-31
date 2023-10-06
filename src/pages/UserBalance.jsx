function UserBalance({ state }) {
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  console.log(state.accountList);
  return (
    <section className="balance__box">
      <div className="user__balance-list">
        <ul className="user__list">
          <li>No.</li>
          <li>Holder&apos;s Name</li>
          <li>Date Created</li>
          <li>Balance</li>
        </ul>
        <div className="balance__list">
          {state.accountList.length === 0 ? (
            <p className="flex items-center justify-center text-gray-300 font-bold text-3xl h-full">
              Create Account
            </p>
          ) : (
            state.accountList.map(
              ({ firstName, initialBalance, date, id }, i) => (
                <ul key={id} className="list">
                  <li className="ml-4">{i + 1}</li>
                  <li>{firstName}</li>
                  <li>{date}</li>
                  <li className="text-green-500">
                    {formatBalance.format(Number(initialBalance).toFixed(2))}
                  </li>
                </ul>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default UserBalance;
