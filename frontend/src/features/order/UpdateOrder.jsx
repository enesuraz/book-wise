import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiBooks";

function UpdateOrder({ orderPrice, estimatedDelivery }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="Patch">
      <input type="hidden" name="orderPrice" value={orderPrice} />
      <input type="hidden" name="estimatedDelivery" value={estimatedDelivery} />
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const orderPrice = Number(Object.fromEntries(formData).orderPrice);
  const priorityPrice = orderPrice * 0.2;
  let estimatedDelivery = Object.fromEntries(formData).estimatedDelivery;
  const remainDays = Math.round(
    (new Date(estimatedDelivery) - new Date()) / (1000 * 60 * 60 * 24)
  );

  if (remainDays < 3)
    throw new Error(
      "Package already is in road.You don't need to set priority"
    );

  const today = new Date();
  estimatedDelivery = new Date(today.setDate(today.getDate() + 2));
  const data = { priority: true, priorityPrice, estimatedDelivery };
  await updateOrder(params.orderId, data);
  return null;
}
