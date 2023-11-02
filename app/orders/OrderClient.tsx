'use client'

import { Order, User } from "@prisma/client"
import { DataGrid } from '@mui/x-data-grid'
import { formatPrice } from "@/utils/formatPrice"
import { GridColDef } from "@mui/x-data-grid/models/colDef"
import Heading from "@/components/Heading"
import Status from "@/components/Status"
import { MdDone,  MdRemoveRedEye, MdDeliveryDining,  } from "react-icons/md"
import ActionBtn from "../../components/products/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";

import moment from "moment"

interface OrdersClientProps{
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const OrdersClient: React.FC<OrdersClientProps> = ({orders}) => {
  const router = useRouter();
  let rows: any = []

    if(orders){
      rows = orders.map((order) =>{
        return {
            id: order.id,
            customer: order.user.name,
            amount: formatPrice(order.amount / 100),
            paymentStatus: order.status,
            date: moment(order.createDate).fromNow(),
            deliveryStatus: order.deliveryStatus,
        };
      });
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 220},
    {field: 'customer', headerName: 'Customer Name', width: 130},
    {field: 'amount', headerName: 'Amount(USD)', width: 130,
     renderCell: (params) => {
      return (<div className="font-bold text-green-800">{params.row.amount}</div>)
    },
  },
    
    {field: 'paymentStatus', headerName: 'Payment Status', width: 130,
    renderCell: (params) => {
      return (<div>{params.row.paymentStatus === 'pending' ? (
      <Status 
      text='pending'
      icon={MdDone}
      bg="bg-green-200"
      color="text-green-700"
      />) : params.row.paymentStatus === 'complete' ? (
      <Status 
      text='completed'
      icon={MdDone}
      bg="bg-green-200"
      color="text-green-700"
      />) :( <></>
      )}</div>)
    },
  },
    {field: 'deliveryStatus', headerName: 'Delivery status', width: 130,
    renderCell: (params) => {
      return (<div>{params.row.deliveryStatus === 
      'pending' ? (<Status 
      text='pending'
      icon={MdDone}
      bg="bg-green-200"
      color="text-green-700"
      />) : params.row.deliveryStatus === 'dispatched' ? (
      <Status 
      text='dispatched'
      icon={MdDeliveryDining}
      bg="bg-purple-200"
      color="text-purple-700"
      />) : params.row.deliveryStatus === 'delivered' ? (
      <Status 
      text='delivered'
      icon={MdDone}
      bg="bg-green-200"
      color="text-green-700"
      />) : (<></>
      )}</div>)
    },
  },
  {
    field: 'date',
    headerName: "Date",
    width: 130,
  },
  {field: 'action', headerName: 'Actions', width: 200, 
  renderCell: (params) => {
    return (
    <div className="flex justify-between gap-4 w-full">
      <ActionBtn icon={MdRemoveRedEye} onClick={() => {
        router.push(`/order/${params.row.id}`)
      }}/>
    </div>)
  },
},
  ];


    return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title=" Orders" />
      </div>
      <div style={{ height: 600, width: '100%'}}>
      <DataGrid
         rows={rows}
         columns={columns}
         initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 10 },
            },
         }}
         pageSizeOptions={[10, 20]}
         checkboxSelection
         disableRowSelectionOnClick
        />
      </div>
       
    </div>
  )
}

export default OrdersClient