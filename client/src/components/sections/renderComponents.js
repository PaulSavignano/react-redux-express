import React from 'react'

import Article from '../articles/Article'
import CardItem from '../cards/CardItem'
import ContactForm from '../contactForms/ContactForm'
import Hero from '../heros/Hero'
import Product from '../products/Product'

const renderComponents = ({ components }) => {
  const componentList = ({ item, kind }) => {
    switch(kind) {
      case 'Article':
        return <Article key={item._id} item={item} />
      case 'Card':
        return <CardItem key={item._id} item={item} />
      case 'ContactForm':
        return <ContactForm key={item._id} item={item} />
      case 'Hero':
        return <Hero key={item._id} item={item} />
      case 'Product':
        return <Product key={item._id} item={item} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

export default renderComponents
