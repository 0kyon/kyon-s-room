import { useShoppingCart } from 'use-shopping-cart';
import { Product } from '@/types/product';

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useShoppingCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price * 100, // Stripe expects price in cents
      currency: product.currency,
      image: product.image,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    >
      カートに追加
    </button>
  );
} 