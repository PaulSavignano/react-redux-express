import React from 'react'

import Article from '../articles/Article'
import CardItem from '../cards/CardItem'
import ContactForm from '../contactForms/ContactForm'
import Hero from '../heros/Hero'
import Product from '../products/Product'

const ComponentSwitch = ({
  component: {
    item,
    kind
  }
}) => {
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


export default ComponentSwitch
