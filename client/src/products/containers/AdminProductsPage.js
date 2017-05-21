import React from 'react'
import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'

const AdminProductsPage = () => (
  <div>
    <h1>Products Admin</h1>
    <AdminProductAdd />
    <AdminProductList />
  </div>
)

export default AdminProductsPage
