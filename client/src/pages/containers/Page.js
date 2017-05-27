import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cart from '../../carts/containers/Cart'
import CarouselList from '../../carousels/containers/CarouselList'
import Contact from '../../users/components/Contact'
import Products from '../../products/containers/Products'
import Sections from '../../sections/containers/Sections'
import NotFound from '../../NotFound'

const defaultPages = [ 'contact', 'products', 'cart' ]

const Page = ({ isFetching, pageSlug, page, sections, carousel }) => (
  (() => {
    switch (pageSlug) {
      case 'notFound':
          return <NotFound />
      case 'products':
          return <Products />
      case 'contact':
          return <Contact />
      case 'cart':
          return <Cart />
      default:
          return (
            <div>
              {sections ? <Sections page={page} /> : null}
              {carousel ? <CarouselList page={page} /> : null}
            </div>
          )
      }
  })()
)

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.params.slug || 'home'
  const page = state.pages.items.find(item => item.slug === slug) || null
  const pages = state.pages.items.map(item => item.slug) || null
  const allPages = defaultPages.concat(pages)
  const pageSlug = allPages.find(page => page === slug) || 'notFound'
  const sections = page ? state.sections.items.find(item => item.pageId === page._id) : null
  const carousel = page ? state.carousels.items.find(item => item.pageId === page._id) : null
  return {
    isFetching: state.pages.isFetching,
    pageSlug,
    page,
    sections,
    carousel
  }
}

export default connect(mapStateToProps)(Page)
