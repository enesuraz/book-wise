import { useState } from "react";
import { createOrder } from "../../services/apiBooks";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";
import { clearCart, totalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const totalCartPrice = useSelector(totalPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const formErrors = useActionData();

  const isLoadingAddress = addressStatus === "loading";

  return (
    <div className="px-3 py-2 mt-5">
      <h2 className="text-2xl tracking-widest mb-8 font-bold">
        Ready to order?
      </h2>

      <Form method="Post">
        <div className="mb-5">
          <label className="label">First Name:</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="phone-input" className="label">
            Phone number:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </div>
            <input
              type="tel"
              id="phone-input"
              name="phone"
              className="input ps-10"
              placeholder="123456789011"
              required
            />
          </div>
          {formErrors && (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-red-700"
            >
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="label">Address:</label>
          <div className="flex items-center relative">
            <input
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input"
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[1px] top-[3px] z-50">
                <Button
                  type="primaryRed"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>

          {addressStatus === "error" && (
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-red-700"
            >
              {errorAddress}
            </p>
          )}
        </div>

        <div className="flex gap-4 mb-10">
          <input
            className="h-6 w-6 accent-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <input type="hidden" name="priorityPrice" value={priorityPrice} />
          <input type="hidden" name="orderPrice" value={totalCartPrice} />
          <Button disabled={isSubmitting | isLoadingAddress}>
            {isSubmitting
              ? "Placing order"
              : `Order ${formatCurrency(totalCartPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const cart = JSON.parse(data.cart);

  const today = new Date();
  const plusDate = data.priority ? 3 : 5;
  const estimatedDelivery = new Date(today.setDate(today.getDate() + plusDate));

  const order = {
    ...data,
    cart: cart,
    priority: data.priority,
    estimatedDelivery,
    orderPrice: Number(data.orderPrice),
    priorityPrice: Number(data.priorityPrice),
  };

  let errors = {};

  if (!isValidPhone(data.phone)) {
    errors.phone = "Please give us correct number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
