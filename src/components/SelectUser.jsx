import { useNavigate } from "react-router-dom";

function SelectUser() {
  const navigate = useNavigate();

  return (
    <p className="absolute top-1/2 left-[60%] translate-x-[-50%] translate-y-[-50%] grid place-items-center w-[80rem] h-[80vh] shadow-[0_0_1rem_rgba(0,0,0,0.3)] text-3xl font-bold">
      <span
        className="goTo__account absolute text-3xl right-[40%] hover:cursor-pointer text-gray-400"
        onClick={() => navigate("/mainPage/accounts")}
      >
        Open Account <i className="fa-solid fa-angles-right "></i>
      </span>
    </p>
  );
}

export default SelectUser;
