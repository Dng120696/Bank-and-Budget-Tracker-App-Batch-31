import useStore from "../store/store";
import { formatBalance } from "../utils/formatBalance";
import { optionDateFormat } from "../utils/option";

function ListOfExpenses() {
  const state = useStore();
  const {
    submit_edited_expense,
    edit_expense_name,
    update_expenses,
    delete_expense,
  } = state;
  return (
    <div className="list__expense">
      {state.selectedAccount?.expenseList.length === 0 ? (
        <p>Add Expense</p>
      ) : (
        state.selectedAccount?.expenseList.map(
          ({ expenseName, amount, date, id, isEdit }, i) => {
            const newDate = new Date(date);
            const formatDate = new Intl.DateTimeFormat(
              "en-PH",
              optionDateFormat
            ).format(newDate);

            return (
              <ul key={i} className="expense__item">
                <li className="ml-4">{id}</li>
                {isEdit ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit_edited_expense(id);
                    }}
                  >
                    <input
                      type="text"
                      name="editExpense"
                      className="input__expense  p-2 w-3/4 border-2"
                      value={state.editExpenseName}
                      onChange={(e) => update_expenses(e.target.value, id)}
                    />
                  </form>
                ) : (
                  <li>{expenseName}</li>
                )}
                <li className="text-gray-500">{formatDate}</li>
                <li className="text-red-500">
                  {"-"} {formatBalance.format(Number(amount).toFixed(2))}
                </li>
                <div className="expense__buttons">
                  <button onClick={() => edit_expense_name(id)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => delete_expense(id)}
                    ></i>
                  </button>
                </div>
              </ul>
            );
          }
        )
      )}
    </div>
  );
}

export default ListOfExpenses;
