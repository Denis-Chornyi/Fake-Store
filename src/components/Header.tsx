import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type HeaderType = {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
};

const Header: React.FC<HeaderType> = ({ showCart, setShowCart }) => {
  const totalQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  return (
    <header className="fixed top-0 left-0 right-0 z-40  bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            React Store Application
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:text-blue-500 transition-colors"
          >
            {totalQuantity === 0 ? (
              ""
            ) : (
              <span className="absolute -top-2 -left-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                {totalQuantity}
              </span>
            )}
            <ShoppingCart className="w-5 h-5" />
            Cart
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
