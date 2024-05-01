import { useSelector } from "react-redux";
import { totalPrice, totalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { Link } from "react-router-dom";

function CartOverview() {
  const totalCartQuantity = useSelector(totalQuantity);
  const totalCartPrice = useSelector(totalPrice);

  return (
    <div className="bg-blue-800 text-blue-100 uppercase p-4 text-sm md:text-base flex items-center justify-between">
      <p className="font-semibold space-x-4">
        <span>{totalCartQuantity} books</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
