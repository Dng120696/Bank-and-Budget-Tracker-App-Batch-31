function FormAddingExpense({ state, dispatch }) {
  const { expenseName, expenseAmount } = state;

  return (
    <section className="adding__expense-section">
      <form
        className="adding__expense"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "EXPENSE_ITEM" });
        }}
      >
        <input
          type="text"
          name="expenseName"
          placeholder="Expense"
          value={expenseName}
          onChange={(e) =>
            dispatch({
              type: "EXPENSE_NAME",
              payload: e.target.value,
            })
          }
        />
        <input
          type="number"
          name="expenseAmount"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) =>
            dispatch({
              type: "AMOUNT",
              payload: { field: e.target.name, input: +e.target.value },
            })
          }
        />
        <button className="btn__add-expense">Add Expense</button>
      </form>
    </section>
  );
}

export default FormAddingExpense;
