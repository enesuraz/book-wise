import { useSelector } from "react-redux";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { Link } from "react-router-dom";

function Header() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="bg-red-600 text-red-100 px-3 py-4 flex items-center justify-between">
      <h1 className="text-2xl">
        <em>
          <Link to="/" className="tracking-widest">
            BookWise
          </Link>
        </em>
      </h1>

      <SearchOrder />

      {username && <Username />}
    </div>
  );
}

export default Header;
