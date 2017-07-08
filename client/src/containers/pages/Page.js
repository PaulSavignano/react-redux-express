import React from 'react'
import { connect } from 'react-redux'

import Cart from '../cart/Cart'
import Contact from '../users/Contact'
import SectionList from '../sections/SectionList'
import NotFound from '../../components/NotFound'

const Page = ({ isFetching, pageSlug, pageId }) => {
  return (
    !isFetching &&
    (() => {
      switch (pageSlug) {
        case 'notFound':
            return <NotFound />
        case 'contact':
            return <Contact />
        case 'cart':
            return <Cart />
        default:
            return <SectionList pageId={pageId} />
        }
    })()
  )
}

const mapStateToProps = ({ pages, products }, { params }) => {
  const slug = params.slug || 'home'
  const page = pages.items.find(item => item.slug === slug) || null
  const defaultPages = products.items.length ? [ 'contact', 'cart' ] : [ 'contact' ]
  const allPages = defaultPages.concat(pages.items.map(item => item.slug))
  const pageSlug = allPages.find(page => page === slug) || 'notFound'
  return {
    isFetching: pages.isFetching,
    pageSlug,
    pageId: page._id,
  }
}

export default connect(mapStateToProps)(Page)
