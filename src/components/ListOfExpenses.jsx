function ListOfExpenses({ state, dispatch }) {
  return (
    <div className="list__expense">
      {state.selectedAccount?.expenseList.length === 0 ? (
        <p>Add Expense</p>
      ) : (
        state.selectedAccount?.expenseList.map(
          ({ name, amount, date, id }, i) => (
            <ul key={i} className="expense__item">
              <li>{id}</li>
              {state.isEdit ? (
                <input
                  type="text"
                  className="input__expense border"
                  value={state.editExpenseName}
                  onChange={(e) =>
                    dispatch({
                      type: "INPUT_EXPENSE",
                      payload: e.target.value,
                    })
                  }
                />
              ) : (
                <li>{name}</li>
              )}
              <li>{date}</li>
              <li>P {Number(amount).toFixed(2)}</li>
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
          )
        )
      )}
    </div>
  );
}

export default ListOfExpenses;
