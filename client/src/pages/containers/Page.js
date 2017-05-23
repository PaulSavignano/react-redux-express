import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Sections from '../../sections/containers/Sections'
import Contact from '../../users/components/Contact'
import Products from '../../products/containers/Products'
import Cart from '../../carts/containers/Cart'


import NotFound from '../../NotFound'

const defaultPages = [ 'contact', 'signin', 'signup', 'products', 'cart' ]

class Page extends Component {
  renderPage = () => {
    const { isFetching, page, sections, slug, pages, pageSlug } = this.props
    console.log(pageSlug)
    switch(pageSlug) {
      case 'notFound':
          return <NotFound />
      case 'products':
          return <Products />
      case 'contact':
          return <Contact />
      case 'cart':
          return <Cart />
      default:
          return sections ? <Sections page={page} /> : null
      }
  }
  render() {
    const { isFetching, page, sections, slug } = this.props
    return (
      isFetching ? null : this.renderPage()
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('hello from page')
  const slug = ownProps.params.slug || 'home'
  const pages = state.pages.items.map(item => item.slug)
  const allPages = defaultPages.concat(pages)
  const page = state.pages.items.find(item => item.slug === slug) || null
  const pageSlug = allPages.find(page => page === slug) || 'notFound'

  const hasSlug = state.pages.items.find(item => item.slug === slug) ? true : false

  const sections = page ? state.sections.items.find(item => item.pageId === page._id) : null
  return {
    isFetching: state.pages.isFetching,
    slug,
    page,
    sections,
    pages,
    pageSlug
  }
}

export default connect(mapStateToProps)(Page)
