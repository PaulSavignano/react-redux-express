import React from 'react'
import { connect } from 'react-redux'

import Cart from '../cart/Cart'
import Contact from '../../components/users/Contact'
import Sections from '../sections/Sections'
import NotFound from '../../components/NotFound'

const Page = ({ isFetching, pageSlug, page, sections, hasProducts }) => {
  return (
    hasProducts ?
    (() => {
      switch (pageSlug) {
        case 'notFound':
            return <NotFound />
        case 'contact':
            return <Contact />
        case 'cart':
            return <Cart />
        default:
            return sections &&  <Sections page={page} />
        }
    })()
    :
    (() => {
      switch (pageSlug) {
        case 'notFound':
            return <NotFound />
        case 'contact':
            return <Contact />
        default:
            return sections && <Sections page={page} />
        }
    })()
  )
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.params.slug || 'home'
  const page = state.pages.items.find(item => item.slug === slug) || null
  const pages = state.pages.items.map(item => item.slug) || null
  const hasProducts = state.products.items.length ? true : false
  const defaultPages = hasProducts ? [ 'contact', 'products', 'cart' ] : [ 'contact' ]
  const allPages = defaultPages.concat(pages)
  const pageSlug = allPages.find(page => page === slug) || 'notFound'
  const sections = page ? state.sections.items.find(item => item.pageId === page._id) : null
  return {
    isFetching: state.pages.isFetching,
    pageSlug,
    page,
    sections,
    hasProducts
  }
}

export default connect(mapStateToProps)(Page)
