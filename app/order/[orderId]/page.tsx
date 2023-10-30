import Container from "@/components/Container";
import NullData from "@/components/NullData";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";


interface Iprams{
    orderId?: string
}
const Order = async({params} : {params:Iprams}) => {
  const order = await getOrderById(params)
    if(!order) return <NullData title="No order"></NullData>
  return (
    <div className="p-8">
        <Container>
            <OrderDetails order ={order}/>
        </Container>
    </div>
  )
}

export default Order