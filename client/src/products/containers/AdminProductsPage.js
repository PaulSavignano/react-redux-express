import React from 'react'
import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'

const AdminProductsPage = () => (
  <main>
    <h1>Products Admin</h1>
    <AdminProductAdd />
    <AdminProductList />
  </main>
)

export default AdminProductsPage
