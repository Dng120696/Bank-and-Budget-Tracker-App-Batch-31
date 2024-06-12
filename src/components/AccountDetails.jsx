import { useState } from "react";
import { Link } from "react-router-dom";
import profilelogo from "../assets/profilelogo.png";
import { optionDateFormat } from "../utils/option";
import useStore from "../store/store";
import { formatBalance } from "../utils/formatBalance";
function AccountDetails() {
  const state = useStore();
  const { selectedAccount, close_account_details, set_modal } = state;
  const [isOpenPass, setIsOpenPass] = useState(false);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full md:h-[55rem] shadow-[0_0_1rem_rgba(0,0,0,0.3)] bg-white z-50 py-12 pt-20 px-10 rounded-md">
      <i
        className="fa-solid fa-xmark text-4xl absolute right-10 top-8 hover:cursor-pointer hover:text-gray-400 "
        onClick={() => close_account_details(false)}
      ></i>

      <>
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-6 items-center">
            <img
              src={profilelogo}
              alt="profile"
              className="w-32 rounded-full"
            />
            <p className="text-5xl font-bold text-gray-900">
              {selectedAccount?.firstName} {selectedAccount?.lastName}
              <span className="block text-2xl mt-2 text-gray-500 ">
                Account No.{" "}
                <span className="text-gray-500">{selectedAccount?.id}</span>
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr,2fr] w-[60%] text-2xl gap-y-6 mb-8">
          <p className=" text-gray-400">Date Created</p>
          <p className=" font-bold text-gray-500">{selectedAccount?.date}</p>
          <p className=" text-gray-400">Birth Date</p>
          <p className=" font-bold text-gray-500">
            {new Date(selectedAccount?.birthDate).toLocaleDateString(
              undefined,
              options
            )}
          </p>
          <p className=" text-gray-400">Email</p>
          <p className=" font-bold text-gray-500">{selectedAccount?.email}</p>
          <p className=" text-gray-400">Password</p>
          <div className="relative">
            <input
              type={isOpenPass ? "text" : "password"}
              value={selectedAccount?.password}
              className="w-full p-0 border-none inline-block text-gray-400 text-2xl"
              readOnly
            />
            <i
              onClick={() => setIsOpenPass((open) => !open)}
              className={`text-gray-500 hover:cursor-pointer absolute right-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ${
                isOpenPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
          </div>
        </div>
        <div>
          <ul className=" grid grid-cols-[0.4fr,1.25fr,0.8fr,0.5fr,0.5fr,0.75fr,0.8fr,0.6fr] bg-blue-600 md:text-lg xl:text-xl py-4  text-white font-bold">
            <li className="pl-4">No.</li>
            <li>Date</li>
            <li>Principal Loan</li>
            <li>Terms</li>
            <li>Interest</li>
            <li>Total Interest</li>
            <li>Payment / month</li>
            <li>Total Loan</li>
          </ul>
          <div className="loan__list overflow-y-scroll h-[12rem]  border-2 mb-8 border-t-0">
            {selectedAccount.loanList.length === 0 ? (
              <p className="flex items-center justify-center h-full text-2xl font-bold text-gray-400">
                No Loan
              </p>
            ) : (
              selectedAccount.loanList.map(
                (
                  {
                    date,
                    interestRate,
                    principalLoan,
                    totalLoan,
                    totalInterest,
                    loanTerms,
                    paymentPermonth,
                  },
                  i
                ) => {
                  const newDate = new Date(date);
                  const formatDate = new Intl.DateTimeFormat(
                    "en-PH",
                    optionDateFormat
                  ).format(newDate);
                  return (
                    <ul
                      key={i}
                      className="grid grid-cols-[0.4fr,1.25fr,0.8fr,0.5fr,0.5fr,0.75fr,0.8fr,0.6fr] py-3 border-b-[1px] text-xl text-gray-600 font-medium "
                    >
                      <li className="pl-4">{i + 1}</li>
                      <li>{formatDate}</li>
                      <li className="text-green-600 ml-2">
                        {formatBalance.format(principalLoan)}
                      </li>
                      <li className="ml-2">{`${loanTerms} months`}</li>
                      <li className="ml-2">{interestRate}</li>
                      <li className="ml-4">
                        {formatBalance.format(totalInterest)}
                      </li>
                      <li className="ml-4">
                        {formatBalance.format(Math.round(paymentPermonth))}
                      </li>
                      <li className="text-green-600 ml-6">
                        {formatBalance.format(totalLoan)}
                      </li>
                    </ul>
                  );
                }
              )
            )}
          </div>
        </div>

        <div className="text-right">
          <Link
            to={`/mainPage/users/${selectedAccount.firstName || ""}`}
            onClick={() => {
              close_account_details(false);
              set_modal(false);
            }}
          >
            <button className=" bg-blue-600 text-white py-4 px-12 font-bold text-xl rounded-md ">
              {" "}
              Open Account
            </button>
          </Link>
        </div>
      </>
    </section>
  );
}

export default AccountDetails;
