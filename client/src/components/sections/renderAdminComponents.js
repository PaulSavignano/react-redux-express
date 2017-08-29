import React from 'react'

import AdminArticle from '../articles/AdminArticle'
import AdminCard from '../cards/AdminCard'
import AdminContactForm from '../contactForms/AdminContactForm'
import AdminHero from '../heros/AdminHero'
import AdminProduct from '../products/AdminProduct'

const renderAdminComponents = ({ components, pageSlug }) => {
  const componentList = ({ item, kind }) => {
    switch(kind) {
      case 'Article':
        return <AdminArticle key={item._id} item={item} pageSlug={pageSlug} />
      case 'Card':
        return <AdminCard key={item._id} item={item} pageSlug={pageSlug} />
      case 'ContactForm':
        return <AdminContactForm key={item._id} item={item} pageSlug={pageSlug} />
      case 'Hero':
        return <AdminHero key={item._id} item={item} pageSlug={pageSlug} />
      case 'Product':
        return <AdminProduct key={item._id} item={item} pageSlug={pageSlug} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

export default renderAdminComponents
