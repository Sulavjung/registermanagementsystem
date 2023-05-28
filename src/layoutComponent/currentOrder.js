import img from "../assets/arrow.png";

function CurrentOrder(props) {
  const { order } = props;

  const subtotal = order.reduce(
    (acc, { price, quantity }) => acc + quantity * price,
    0
  );

  const fixedSubtotal = subtotal.toFixed(2);
  const taxRate = 0.08;
  const tax = (subtotal * taxRate).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  const totalSubtotal = (fixedSubtotal, tax, total) => {
    return (
      <div>
        <div className="flex justify-between">
          <p className="text-gray-700">Subtotal:</p>
          <p className="text-gray-700">${fixedSubtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Tax:</p>
          <p className="text-gray-700">${tax}</p>
        </div>
        <div className="flex justify-between font-bold pt-2">
          <p className="text-gray-900">Total:</p>
          <p className="text-gray-900">${total}</p>
        </div>
      </div>
    );
  };
  const renderItem = (item) => (
    <div className="grid grid-cols-8 py-2 my-2 rounded px-2 bg-teal-50">
      <h1 className="col-span-5 text-bold">{item.name}</h1>

      <span className="col-span-1 text-end">
        <span className="text-blue-500">x </span>
        {item.quantity}
      </span>

      <span className="col-span-2 text-end px-2">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );

  return (
    <div className="relative col-span-2 px-1 border-r h-screen overflow-y-auto">
      <div className="h-full overflow-y-auto pb-20">
        <div className="flex-1">
          <h1 className="font-bold text-gray-800 text-start pt-2">Cart</h1>

          <div className="mt-5 overflow-auto">
            {order.length ? (
              <div>{order.map((item, index) => renderItem(item))}</div>
            ) : (
              <div className="flex flex-row text-bold text-center border m-2 rounded p-5 bg-teal-50 mb-5 pb-5">
                <img
                  src={img}
                  className="block h-20 w-auto mx-auto transform rotate-45"
                  alt=""
                />
                <div className="text-start p-5 ">
                  <span className="block">No items in the cart. </span>
                  <span className="block">
                    Select Items from the side to add it in the basket.{" "}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-2 pt-5 mt-5 bg-teal-50 rounded z-10">
          {totalSubtotal(fixedSubtotal, tax, total)}
        </div>
      </div>
    </div>
  );
}

export default CurrentOrder;
