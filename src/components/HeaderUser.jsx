import profilelogo from "../assets/profilelogo.png";

function HeaderUser({ state, formatBalance }) {
  const { initialBalance, firstName, lastName, id } =
    state?.selectedAccount || "";
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <img src={profilelogo} alt="profile" className="w-24 rounded-full" />
        <h1 className="user__name">
          {firstName} {lastName}
          <span className="block text-2xl text-gray-400">Account No:{id}</span>
        </h1>
      </div>

      <div className="balance">
        <p>
          <span>Current Balance</span>
          <span className="date">
            {new Intl.DateTimeFormat("en-PH", options).format(now)}
          </span>
        </p>
        <p
          className={`initial__balance ${
            initialBalance > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatBalance.format(Number(initialBalance).toFixed(2))}
        </p>
      </div>
    </>
  );
}

export default HeaderUser;
