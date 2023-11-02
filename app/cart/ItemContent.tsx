'use client'

import React from "react"
import { CartProductType } from "../product/[productId]/ProductDetails"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import Image from "next/image"
import SetQuantity from "@/components/SetQuantity"
import { useCart } from "@/hooks/useCart"

interface ItemContentProps{
    item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({item}) => {
  const {handleRemoveProductFromcart, handleCartQtyincrease, handleCartQtyDecrease,} = useCart()
  return (
    <div className="grid grid-cols-5 text-xs gap-4 md:text-sm border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
         <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
                <Image
                 src={item.selectedImg.image} 
                 alt={item.name}
                 fill
                 className="object-contain"
                />
            </div>
         </Link> 
         <div className="flex flex-col justify-between">
           <Link href={`/product/${item.id}`}>
              {item.name}
            </Link>
              <div>{item.selectedImg.color}</div>
              <div className="w-[70px] ">
              <button onClick={() => handleRemoveProductFromcart(item)} className="text-slate-500 underline">Remove</button>
              </div>
           
         </div>
      </div> 
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity 
         cartCounter={true}
         cartProduct={item}
         handleQtyIncrease={() => {handleCartQtyincrease(item)}}
         handleQtyDecrease={() => {handleCartQtyDecrease(item)}} 
        /> 
      </div>
      <div className="justify-self-end font-semibold">
        {(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default ItemContent