import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="mt-10 mb-10 text-center px-4">
      <h1 className="text-stone-700 font-semibold text-xl mb-4 md:text-2xl">
        Welcome to BookWise
        <br />
        <span className="text-red-700">Embark on a Literary Journey</span>
      </h1>

      {username ? <Button to="/menu">Continue</Button> : <CreateUser />}
    </div>
  );
}

export default Home;
