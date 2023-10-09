import { optionTransact } from "../useReducer&InitialState/reducerTransaction";

function ListOfExpenses({ state, dispatch, formatBalance }) {
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
              optionTransact
            ).format(newDate);

            return (
              <ul key={i} className="expense__item">
                <li className="ml-4">{id}</li>
                {isEdit ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch({ type: "SUBMIT_EDITED_EXPENSE", payload: id });
                    }}
                  >
                    <input
                      type="text"
                      name="editExpense"
                      className="input__expense  p-2 w-3/4 border-2"
                      value={state.editExpenseName}
                      onChange={(e) =>
                        dispatch({
                          type: "INPUT_EXPENSE",
                          payload: { input: e.target.value, id },
                        })
                      }
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
                  <button
                    onClick={() =>
                      dispatch({ type: "EDIT_EXPENSE-NAME", payload: id })
                    }
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() =>
                        dispatch({ type: "DELETE_EXPENSE", payload: id })
                      }
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
