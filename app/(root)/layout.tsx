
import Footer from '@/components/Footer'
import Navbar from '@/components/nav/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    
      <main className='flex-grow'>{children}</main>
  )
}

export default layout