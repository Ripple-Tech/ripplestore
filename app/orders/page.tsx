import Container from '@/components/Container'
import getCurrentUser from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import getOrdersByUserId from "@/actions/getOrdersByUserId"
import OrdersClient from './OrderClient'

const Orders = async() => {
 const currentUser = await getCurrentUser()

 if(!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title=" Access denied"/>
 }

const orders = await getOrdersByUserId(currentUser.id)

if(!orders){
    return <NullData title="No orders yet"/>
 }
  return (
    <div className='pt-8'>
      <Container>
      <OrdersClient orders = {orders}/>
      </Container>
    </div>
  )
}

export default Orders
