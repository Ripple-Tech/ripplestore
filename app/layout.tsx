import CartProvider from '@/providers/CartProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'


export const metadata: Metadata = {
  title: 'Ripple',
  description: 'Ripple online shopping',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="en">
      <body className="min-h-screen font-poppins">
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff'
          }
        }}/>
      <CartProvider>
      <div className='flex flex-col min-h-screen'>
        
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
     
    </div>
    </CartProvider>
      </body>
    </html>
  )
}

