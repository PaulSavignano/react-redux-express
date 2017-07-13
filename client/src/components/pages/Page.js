import React from 'react'

import Cart from '../../containers/cart/Cart'
import SectionList from '../../containers/sections/SectionList'
import NotFound from '../../components/NotFound'

const Page = ({ items, slug }) => {
  const pageSlug = slug || 'home'
  const page = items.find(item => item.slug === pageSlug)
  return (
    (() => {
      switch (pageSlug) {
        case 'notFound':
          return <NotFound />
        case 'cart':
          return <Cart />
        default:
          return <SectionList page={page} />
        }
    })()
  )
}

export default Page
