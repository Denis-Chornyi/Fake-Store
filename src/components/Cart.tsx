import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeItem, updateQuantity } from "../store/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  const { items, total } = useSelector(
    (state: RootState) => state.cart
  );

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-gray-600">
                ${item.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(0, item.quantity - 1),
                    })
                  )
                }
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>

              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-2xl font-bold">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
