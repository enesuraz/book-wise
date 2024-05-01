import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteCart from "./DeleteCart";
import UpdateCart from "./UpdateCart";
import { getById } from "./cartSlice";

function CartItem({ item }) {
  const { bookId, title, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getById(bookId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {title}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCart bookId={bookId} currentQuantity={currentQuantity} />
        <DeleteCart bookId={bookId} />
      </div>
    </li>
  );
}

export default CartItem;
