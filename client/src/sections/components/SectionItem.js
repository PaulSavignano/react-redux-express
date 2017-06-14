import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import Cards from '../../cards/containers/Cards'
import Products from '../../products/containers/Products'
import Carousels from '../../carousels/containers/Carousels'

class SectionItem extends Component {
  createMarkup = (html) => {
    return {__html: html};
  }
  renderWithValues = (section, cards, products, carousels) => {
    const { values } = section
    const { fontFamily } = this.props.brand
    const height = values.height || null
    const backgroundColor = values.backgroundColor || null
    const margin = values.margin || null
    const padding = values.padding || null
    const titleAlign = values.titleAlign ? { textAlign: values.titleAlign } : null
    const textAlign = values.textAlign ? { textAlign: values.textAlign } : null
    const color = values.color || null
    const title = values.title || null
    const text = values.text || null
    const backgrounds = section.image ? {
      backgroundImage: `url(${section.image})`,
      backgroundAttachment: values.backgroundAttachment,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    } : null
    return (
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div style={{
          height,
          ...backgrounds,
          backgroundColor,
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: 1044, margin: '0 auto' }}>
            <div style={{
              margin,
              padding
            }}>
              {title ? <h1 style={{ color, fontFamily, ...titleAlign }}>{title}</h1> : null}
              {text ? <div style={{ color, fontFamily, ...textAlign }}>{renderHTML(text)}</div> : null}
            </div>
            { cards ? <Cards section={ section } cards={ cards }/> : null }
            { products ? <Products section={ section } products={ products }/> : null }
          </div>
          { carousels ? <Carousels section={ section } carousels={carousels} /> : null }
        </div>
      </CSSTransitionGroup>
    )
  }
  render() {
    const { isFetching, section, cards, products, carousels } = this.props
    return (
      isFetching ? null : section.values ? this.renderWithValues(section, cards, products, carousels) :
      <section>
        { cards ? <Cards section={ section } cards={ cards }/> : null }
        { products ? <Products section={ section } products={ products }/> : null }
        { carousels ? <Carousels section={ section } carousels={carousels} /> : null }
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.cards.isFetching,
    cards: state.cards.items.filter(item => item.sectionId === ownProps.section._id) || null,
    products: state.products.items.filter(item => item.sectionId === ownProps.section._id) || null,
    carousels: state.carousels.items.filter(item => item.sectionId === ownProps.section._id) || null
  }
}

export default connect(mapStateToProps)(SectionItem)
