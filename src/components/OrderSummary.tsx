import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void
}

const OrderSummary = ({restaurant, cartItems, removeFromCart}: Props) => {

    const getTotalCost = () => {
        const totalItemPrice = cartItems.reduce((
            total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );

        const totalPrice = totalItemPrice / 100 + restaurant.deliveryPrice;

        return (totalPrice);
    };

  return(
    <>
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                <span>Your Order</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            {cartItems.map((item) => (
                <div className="flex justify-between">
                    <span>
                        <Badge variant="outline" className="mr-2" >
                            {item.quantity}
                        </Badge>
                        {item.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <Trash className="cursor-pointer" color="grey" size={20} onClick={() => removeFromCart(item)}/>
                        ${(item.price * item.quantity) / 100}
                    </span>
                </div>
            ))}
            <Separator />
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>${(restaurant.deliveryPrice)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
                <span className="mr-4">Total</span>
                <span className="font-bold">${getTotalCost()}</span>
            </div>
        </CardContent>
    </>
  )
}

export default OrderSummary;