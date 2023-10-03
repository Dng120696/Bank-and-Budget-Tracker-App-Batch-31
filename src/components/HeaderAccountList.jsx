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
        onClick={() => dispatch({ type: "ADD_ACCOUNT" })}
      >
        Add Account
      </button>
    </header>
  );
}

export default HeaderAccountList;
