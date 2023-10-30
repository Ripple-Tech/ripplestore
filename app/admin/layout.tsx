import AdminNav from "@/components/admin/AdminNav"

export const metadata = {
    title: 'RippleStore Admin',
    description: 'RippleStore admin dashboard'
}

const AdminLayout
 = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout
