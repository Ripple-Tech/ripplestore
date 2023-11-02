import Link from "next/link"
import  Container  from "../Container"
import CartCount from "./CartCount"
import UserMenu from "./UserMenu"
import SearchBar from "./SearchBar"
import  getCurrentUser  from "@/actions/getCurrentUser"
import Categories from "./Categories"

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  console.log('currentuser:', currentUser)
  

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-2">
       <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <Link href="/" className="font-bold font-2xl">RippleStore</Link>
           <div className="hidden md:block"><SearchBar /> </div>
          <div className="flex items-center gap-8 md:gap-12">
           <div><CartCount /></div>
           <div><UserMenu currentUser={currentUser}/></div>
          </div>
         </div> 
      </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar