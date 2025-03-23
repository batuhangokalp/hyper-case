import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductItem = ({ product }) => {
  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const body = {
      ...product,
      quantity: 1,
      userId: storedAuth.username,
    };

    dispatch(addToCart(body));
  };

  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden">
      <div className="h-52 flex justify-center items-center">
        <img
          src={product?.image}
          alt={product?.title || "Product"}
          className="h-full object-contain"
        />
      </div>
      <div className="p-4 text-center flex flex-col items-center">
        <span className="font-bold block h-12 min-h-[48px] text-ellipsis overflow-hidden line-clamp-2">
          {product?.title}
        </span>
        <span className="text-gray-600">{product?.price?.toFixed(2)} ₺</span>
      </div>
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductItem;
