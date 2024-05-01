import Button from "../../ui/Button";

function EmptyCart() {
  return (
    <div className="px-2 py-3">
      <Button to="/menu" type="link">
        &larr; Back to menu
      </Button>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some books :)
      </p>
    </div>
  );
}

export default EmptyCart;
