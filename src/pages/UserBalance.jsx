function UserBalance({ state }) {
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  return (
    <section className="balance__box">
      <div className="user__balance-list">
        <ul className="user__list">
          <li>No.</li>
          <li>Name</li>
          <li>Date</li>
          <li>Balance</li>
        </ul>
        {state.accountList.map(({ firstName, initialBalance, date, id }, i) => (
          <ul key={id} className="balance__list">
            <li className="ml-4">{i + 1}</li>
            <li>{firstName}</li>
            <li>{date}</li>
            <li>{formatBalance.format(Number(initialBalance).toFixed(2))}</li>
          </ul>
        ))}
      </div>
    </section>
  );
}

export default UserBalance;