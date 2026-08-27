import React from "react";
import { useDispatch } from "react-redux";
import { X, ShoppingCart } from "lucide-react";
import { Product } from "../types/product";
import { addItem } from "../store/cartSlice";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold">${product.price}</span>

                <span className="text-sm text-gray-500">
                  Category: {product.category.name}
                </span>
              </div>

              <button
                onClick={() => {
                  dispatch(addItem(product));
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 text-white py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
