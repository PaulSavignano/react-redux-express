import React from 'react'

import Article from '../articles/Article'
import CardItem from '../cards/CardItem'
import Hero from '../heros/Hero'
import Product from '../products/Product'
import View from '../views/View'

const renderComponents = ({ components }) => {
  const componentList = ({ item, kind }) => {
    switch(kind) {
      case 'Article':
        return <Article key={item._id} item={item} />
      case 'Card':
        return <CardItem key={item._id} item={item} />
      case 'Hero':
        return <Hero key={item._id} item={item} />
      case 'Product':
        return <Product key={item._id} item={item} />
      case 'View':
        return <View key={item._id} item={item} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

export default renderComponents
