import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getById } from "../cart/cartSlice";
import DeleteCart from "../cart/DeleteCart";
import UpdateCart from "../cart/UpdateCart";

function MenuItem({ book }) {
  const { id, title, price, description, author, image_url, exhausted } = book;
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    const newItem = {
      bookId: id,
      title,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  }

  const currentQuantity = useSelector(getById(id));
  const isInCart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={image_url}
        alt={title}
        className={`h-24 ${exhausted ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{title}</p>
        <p className="text-sm capitalize italic text-stone-500 w-8/12">
          {description} <br />{" "}
          <em className="text-right block mt-1">- {author}</em>
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!exhausted ? (
            <p className="text-sm">{formatCurrency(price)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Exhausted
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateCart bookId={id} currentQuantity={currentQuantity} />
              <DeleteCart bookId={id} />{" "}
            </div>
          )}
          {!exhausted && !isInCart && (
            <Button type="small" onClick={handleClick}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
