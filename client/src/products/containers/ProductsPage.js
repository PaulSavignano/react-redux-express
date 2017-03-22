import React, { Component } from 'react'
import ProductList from '../components/ProductList'
import ProductSearch from '../components/ProductSearch'

const ProductsPage = () => (
  <div className="android-more-section">
    <div className="android-section-title mdl-typography--display-1-color-contrast">Products</div>
    <ProductSearch/>
    <ProductList />
  </div>
)

export default ProductsPage
