import { useContext } from "react";
import CartContext, { UseCartContextType } from "../context/CartProvider";

export default function useCart(): UseCartContextType {
    return useContext(CartContext);
}
