import HeaderUser from "../components/HeaderUser";
import InputTransaction from "../components/InputTransaction";
import UserTransactionList from "../components/UserTransactionList";
import FormSendMoney from "../components/FormSendMoney";
import HeaderExpense from "../components/HeaderExpense";
import ListOfExpenses from "../components/ListOfExpenses";
import FormAddingExpense from "../components/FormAddingExpense";

export function Users({ state, dispatch }) {
  const formatBalance = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      <section className="user__account">
        <HeaderUser state={state} formatBalance={formatBalance} />

        <section className="section__transact">
          <UserTransactionList state={state} formatBalance={formatBalance} />
          <InputTransaction state={state} dispatch={dispatch} />
          <FormSendMoney state={state} dispatch={dispatch} />
        </section>

        <section className="expense__list">
          <HeaderExpense />
          <ListOfExpenses state={state} dispatch={dispatch} />
          <FormAddingExpense state={state} dispatch={dispatch} />
        </section>
      </section>
    </>
  );
}
