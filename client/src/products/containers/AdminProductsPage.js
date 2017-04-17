import React from 'react'
import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'
import ProductSearch from '../components/ProductSearch'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const AdminProductsPage = () => (
  <main>
    <h3>Products Admin</h3>
    <AdminProductList />
  </main>
)

export default AdminProductsPage
