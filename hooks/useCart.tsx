import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductTocart: (product: CartProductType) => void
    handleRemoveProductFromcart: (product: CartProductType) => void
    handleCartQtyincrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
    paymentIntent: string | null; 
    handleSetPaymentIntent: (val: string | null) => void;   
};

export const CartContext = createContext<CartContextType | null> (null);
interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
    
    useEffect(() => {
      const cartItems: any = localStorage.getItem('eShopCartItems');
      const cProducts: CartProductType[] | null = JSON.parse(cartItems);
      const eshopPaymentIntent:any = localStorage.getItem('eshopPaymentIntent' );
      const paymentIntent: string | null = JSON.parse(eshopPaymentIntent);

      setCartProducts(cProducts);
      setPaymentIntent(paymentIntent);
      
    }, [])  


    useEffect(() => {
      const getTotal = () => {
        if(cartProducts) {

          const {total, qty}  =  cartProducts?.reduce((acc, item) =>{
               const itemTotal = item.price * item.quantity 
               acc.total += itemTotal
               acc.qty += item.quantity
       
               return acc;
              }, {
               total: 0,
               qty: 0
              });

              setCartTotalQty(qty)
              setCartTotalAmount(total)
        }
      };
      getTotal()
    }, [cartProducts])
    
    
   
    const handleAddProductTocart = useCallback(
      (product: CartProductType) => { setCartProducts ((prev) => {
        let updatedCart;
        if(prev){
            updatedCart = [...prev, product]
        } else{
            updatedCart = [product]
        }
        toast.success("Product added to cart")
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        return updatedCart;
      })},
      [],
    )

    const handleRemoveProductFromcart = useCallback(
      (product: CartProductType) => {
        if(cartProducts){
           const filteredProducts =  cartProducts.filter
           ((item) => {return item.id !== product.id })

           setCartProducts (filteredProducts)
           toast.success("Product removed from cart")
           localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
          
        }
       },
      [cartProducts],
    )
    
    const handleCartQtyincrease = useCallback(
      (product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 100) {
            return toast.error("Ooops! Maximum reached.")
        }
        if(cartProducts){
          updatedCart = [...cartProducts]
          const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

       if(existingIndex > -1){
         updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
       }
         setCartProducts(updatedCart)
         localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }
      },
      [cartProducts],
    )
    
    const handleCartQtyDecrease = useCallback(
      (product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1) {
            return toast.error("Ooops! Minimum reached.")
        }
        if(cartProducts){
          updatedCart = [...cartProducts]
          const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

       if(existingIndex > -1){
         updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
       }
         setCartProducts(updatedCart)
         localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }
      },
      [cartProducts],
    );

    const handleClearCart = useCallback(
      () => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null));
      },
      [cartProducts],
    )

    const handleSetPaymentIntent = useCallback((val: string | null ) => {
      setPaymentIntent(val)
      localStorage.setItem('eShopPaymentIntent',JSON.stringify(val) );
      },
      [paymentIntent],
    )
    

    const value = {
        cartTotalQty, 
        cartProducts,
        handleAddProductTocart,
        handleRemoveProductFromcart,
        handleCartQtyincrease,
        handleCartQtyDecrease,
        handleClearCart,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent,
    }
    return ( 
        <CartContext.Provider value={value} {... props}/>
    )
}

export const useCart = () => {
   const context = useContext(CartContext); 
   if(context === null){
    throw new Error("useCart must be used within a CartContextProvider")
   }
   return context
};