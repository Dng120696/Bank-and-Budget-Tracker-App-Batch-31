import { useState } from "react";
import { Link } from "react-router-dom";

function AccountDetails({ state, dispatch }) {
  const { selectedAccount } = state;
  const [isOpenPass, setIsOpenPass] = useState(false);
  return (
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[50rem] h-[40rem] shadow-[0_0_1rem_rgba(0,0,0,0.3)] bg-white z-50 py-12 px-8">
      <i
        className="fa-solid fa-xmark"
        onClick={() =>
          dispatch({ type: "CLOSE_ACCOUNT-DETAILS", payload: false })
        }
      ></i>
      <h1>Account Details</h1>

      <div>
        <p>First Name:</p>
        <p>{selectedAccount?.firstName}</p>
        <p>Last Name:</p>
        <p>{selectedAccount?.lastName}</p>
        <p>Account No.:</p>
        <p>{selectedAccount?.id}</p>
        <p>Current Balance:</p>
        <p>{selectedAccount?.initialBalance}</p>
        <p>{selectedAccount?.id}</p>
        <p>Date Created:</p>
        <p>{selectedAccount?.date}</p>
        <p>Birth Date:</p>
        <p>{selectedAccount?.birthDate}</p>
        <p>Email:</p>
        <p>{selectedAccount?.email}</p>
        <p>Password:</p>
        <div>
          <input
            type={isOpenPass ? "text" : "password"}
            value={selectedAccount?.password}
            className="w-40 p-0 border-none inline-block"
            readOnly
          />
          <i
            onClick={() => setIsOpenPass((open) => !open)}
            className={`text-gray-500 hover:cursor-pointer ${
              isOpenPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
            }`}
          ></i>
        </div>
        {/* <div>{loanList.map((list) => {})}</div> */}
        <p>
          {" "}
          <Link to={`/mainPage/users/${selectedAccount?.firstName}`}></Link>
        </p>
      </div>
    </section>
  );
}

export default AccountDetails;
