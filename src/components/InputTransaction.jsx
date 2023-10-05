function InputTransaction({
  state,
  onWidthdraw,
  onDeposit,
  onSetInput,
  onSetLoan,
}) {
  const {
    isamountWidthdrawError,
    isamountDepositError,
    isamountLoanError,
    amountWidthdrawError,
    amountDepositError,
    amountLoanError,
    amountWidthdraw,
    amountDeposit,
    amountLoan,
  } = state;

  return (
    <section className="input__transaction text-right">
      <form className="widthdraw__form relative" onSubmit={onWidthdraw}>
        <input
          type="number"
          name="amountWidthdraw"
          placeholder="Amount"
          className={
            isamountWidthdrawError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          value={amountWidthdraw}
          onChange={onSetInput}
        />
        {isamountWidthdrawError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {amountWidthdrawError}
          </small>
        ) : (
          ""
        )}
        <button>Widthdraw</button>
      </form>
      <form className="deposit__form relative" onSubmit={onDeposit}>
        <input
          type="number"
          name="amountDeposit"
          placeholder="Amount"
          value={amountDeposit}
          className={
            isamountDepositError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          onChange={onSetInput}
        />
        {isamountDepositError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {amountDepositError}
          </small>
        ) : (
          ""
        )}
        <button>Deposit</button>
      </form>
      <form className="request__form relative" onSubmit={onSetLoan}>
        <input
          type="number"
          name="amountLoan"
          placeholder="Amount"
          className={
            isamountLoanError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          value={amountLoan}
          onChange={onSetInput}
        />
        {isamountLoanError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {amountLoanError}
          </small>
        ) : (
          ""
        )}
        <button>Request Loan</button>
      </form>
    </section>
  );
}

export default InputTransaction;
