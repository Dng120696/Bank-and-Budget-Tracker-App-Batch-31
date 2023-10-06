function HeaderAccountList({ dispatch, state }) {
  const { issearchQueryError, searchQueryError } = state;

  function handleSearch(e) {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUT",
      payload: { field: name, input: value },
    });

    dispatch({ type: "SEARCH_ACCOUNT", payload: value });
  }

  return (
    <header className="header__account">
      <div className="relative w-[30rem]">
        <input
          type="search"
          name="searchQuery"
          className={`input__search ${
            issearchQueryError
              ? "border-1 border-rose-500"
              : "border-1 border-gray-300"
          }`}
          placeholder="Search Name..."
          value={state.searchQuery}
          onChange={handleSearch}
        />
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-8 translate-x-[-50%] translate-y-[-50%] text-2xl text-gray-400"></i>
        {issearchQueryError && (
          <small className="text-lg text-red-500 absolute bottom-[-1.8rem] left-0">
            {searchQueryError}
          </small>
        )}
      </div>

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
