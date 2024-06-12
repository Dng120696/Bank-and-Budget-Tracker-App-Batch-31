import useStore from "../store/store";

function FormAddingExpense({ onSetExpene, onSetInput }) {
  const state = useStore();
  const {
    expenseName,
    expenseAmount,
    isexpenseNameError,
    isexpenseAmountError,
    expenseNameError,
    expenseAmountError,
  } = state;

  return (
    <section className="adding__expense-section">
      <form className="adding__expense" onSubmit={onSetExpene}>
        <div className="relative">
          <input
            type="text"
            name="expenseName"
            placeholder="Expense Name"
            className={
              isexpenseNameError
                ? "border-1 border-rose-500"
                : "border-[2px_solid_rgba(0,0,0,0.2)]"
            }
            value={expenseName}
            onChange={onSetInput}
          />
          {isexpenseNameError ? (
            <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
              {expenseNameError}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            name="expenseAmount"
            placeholder="Amount"
            className={
              isexpenseAmountError
                ? "border-1 border-rose-500"
                : "border-[2px_solid_rgba(0,0,0,0.2)]"
            }
            value={expenseAmount}
            onChange={onSetInput}
          />
          {isexpenseAmountError ? (
            <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
              {expenseAmountError}
            </small>
          ) : (
            ""
          )}
        </div>

        <button className="btn__add-expense">Add Expense</button>
      </form>
    </section>
  );
}

export default FormAddingExpense;
