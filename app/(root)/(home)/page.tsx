export const revalidate = 0;
import  Container  from '@/components/Container'
import ProductCard from '@/components/ProductCard';
import getProducts, { IproductParams } from '@/actions/getProducts';
import NullData from '@/components/NullData';
interface HomeProps{
  searchParams: IproductParams
}
export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

 if(products.length === 0){
  return <NullData title='Oops! No products found.'/>
 }

  function shuffleArray(array: any){
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const shuffledProducts = shuffleArray(products)

  return (
      <Container>
       <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
        {shuffledProducts.map((product: any) => {
          return (
          <ProductCard data={product} key={product.id}/>
          )
        })}
       </div>
      </Container>
  ); 
}
