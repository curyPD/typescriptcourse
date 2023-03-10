import { useContext } from "react";
import ProductsContext, {
    UseProductsContextType,
} from "../context/ProductsProvider";

export default function useProducts(): UseProductsContextType {
    return useContext(ProductsContext);
}
