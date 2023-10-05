function HeaderAccountList({ dispatch }) {
  return (
    <header className="header__account">
      <input
        type="search"
        name="searchName"
        className="input__search"
        placeholder="Search..."
      />
      <button
        className="btn btn__add-account"
        onClick={() => dispatch({ type: "OPEN_MODAL-ACCOUNT", payload: true })}
      >
        Add Account
      </button>
    </header>
  );
}

export default HeaderAccountList;
