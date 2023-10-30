import Container from "@/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "../../../actions/getProductById";
import NullData from "@/components/NullData";
import AddRating from "./AddRating";
import getCurrentUser from "@/actions/getCurrentUser";

interface Iprams{
    productId?: string
}
const Product = async({params} : {params:Iprams}) => {
  
  const product = await getProductById(params)
  const user = await getCurrentUser()
  if(!product) return <NullData title="Oops! Product with the given id does not exist"/>
    
  return (
    <div className="p-8">
        <Container>
            <ProductDetails product ={product}/>
            <div  className="flex flex-col mt-20 gap-4">
              <div><AddRating product={product} user={user}/></div>
              <div><ListRating product={product}/></div>
            </div>
        </Container>
    </div>
  )
}

export default Product