import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../types/product";
import { addItem } from "../store/cartSlice";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addItem(product));
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="relative pt-[100%]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>

        <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">${product.price}</span>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
