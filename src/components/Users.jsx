// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

export function Users({ state, dispatch }) {
  const { initialBalance, firstName, lastName } = state?.selectedAccount || "";
  console.log(firstName);
  const {
    amountWidthdraw,
    amountDeposit,
    senderAmount,
    expenseName,
    expenseAmount,
    receiverId,
  } = state;
  // const navigate = useNavigate();

  // console.log(state);
  // useEffect(() => {
  //   if (state.selectedAccount) {
  //     navigate("/transaction");
  //   } else {
  //     navigate("/mainPage");
  //   }
  // }, [state.selectedAccount, navigate]);

  return (
    <>
      <section className="user__account">
        <h1 className="user__name">
          {firstName} {lastName}
        </h1>

        <div className="balance">
          <p>
            <span>Current Balance</span>
            <span className="date">02 / 10 / 2023</span>
          </p>
          <p className="initial__balance">${initialBalance}</p>
        </div>
        <div>
          <h1>Transaction history</h1>
          {state.selectedAccount?.userTransactionHistory.map(
            ({ name, id, type, amount }, i) => {
              const transactionTypes = {
                widthdraw: "widthdraw",
                send: "send",
                received: "received",
                deposit: "deposit",
                deduct: "deduct",
              };

              return (
                <div key={i}>
                  <p>{id}</p>
                  <p>{name}</p>
                  <p>{transactionTypes[type] || ""}</p>
                  <p>
                    {type === "widthdraw" || type === "send"
                      ? -amount
                      : "+" + amount}
                  </p>
                </div>
              );
            }
          )}
        </div>
        <form
          className="widthdrawForm"
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
                payload: { field: e.target.name, input: +e.target.value },
              })
            }
          />
          <button>Widthdraw</button>
        </form>
        <form
          className="depositForm"
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
                payload: { field: e.target.name, input: +e.target.value },
              })
            }
          />
          <button>Deposit</button>
        </form>
        <form
          className="transferForm"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "SEND_MONEY" });
          }}
        >
          <input
            type="number"
            name="receiverID"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) =>
              dispatch({ type: "RECEIVER_ID", payload: +e.target.value })
            }
          />
          <input
            type="number"
            name="senderAmount"
            placeholder="Amount"
            value={senderAmount}
            onChange={(e) =>
              dispatch({
                type: "AMOUNT",
                payload: { field: e.target.name, input: +e.target.value },
              })
            }
          />
          <button>Transfer</button>
        </form>
        <section className="expenseItem">
          <div className="listExpense">
            {state.selectedAccount?.expenseList.map(
              ({ name, amount, id }, i) => (
                <div key={i}>
                  <p>{id}</p>
                  <p>{name}</p>
                  <p>{-amount}</p>
                </div>
              )
            )}
          </div>
          <button>Add Expense</button>

          <form
            className="addingExpense"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: "EXPENSE_ITEM" });
            }}
          >
            <h2>Expense</h2>
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
            <button>Add</button>
          </form>
        </section>
      </section>
    </>
  );
}
