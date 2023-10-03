function InputTransaction({ state, dispatch }) {
  const { amountWidthdraw, amountDeposit, amountRequest } = state;
  return (
    <section className="input__transaction text-right">
      <h1 className="text-3xl font-bold text-gray-500">Set Your Transaction</h1>
      <form
        className="widthdraw__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "WIDTHDRAW" });
        }}
      >
        <input
          type="number"
          name="amountWidthdraw"
          placeholder="Amount"
          value={amountWidthdraw}
          onChange={(e) =>
            dispatch({
              type: "AMOUNT",
              payload: { field: e.target.name, input: e.target.value },
            })
          }
        />
        <button>Widthdraw</button>
      </form>
      <form
        className="deposit__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "DEPOSIT" });
        }}
      >
        <input
          type="number"
          name="amountDeposit"
          placeholder="Amount"
          value={amountDeposit}
          onChange={(e) =>
            dispatch({
              type: "AMOUNT",
              payload: { field: e.target.name, input: e.target.value },
            })
          }
        />
        <button>Deposit</button>
      </form>
      <form
        className="request__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "DEPOSIT" });
        }}
      >
        <input
          type="number"
          name="amountRequest"
          placeholder="Amount"
          value={amountRequest}
          onChange={(e) =>
            dispatch({
              type: "AMOUNT",
              payload: { field: e.target.name, input: e.target.value },
            })
          }
        />
        <button>Request Loan</button>
      </form>
    </section>
  );
}

export default InputTransaction;
