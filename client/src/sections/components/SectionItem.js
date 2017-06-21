import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import CardItem from '../../cards/components/CardItem'
import ProductItem from '../../products/components/ProductItem'
import Carousels from '../../carousels/containers/Carousels'

class SectionItem extends Component {
  state = {
    hasImage: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.section
    if (image) {
      this.setState({ hasImage: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = (e) => {
        this.setState({ image: src })
      }
    }
  }
  renderComponents = () => {
    const { section, components } = this.props
    return components.map(component => {
      switch(component.type) {
        case 'Card':
          return <CardItem key={component._id} card={component} section={section} />
          break
        case 'Product':
          return <ProductItem key={component._id} product={component} section={section} />
          break
        default:
          return
      }
    })
  }
  renderContents = (section) => {
    const values = section.values || {}
    const { fontFamily } = this.props.brand
    const text = values.text || null
    const height = values.height || null
    const backgroundColor = values.backgroundColor || null
    const margin = values.margin || null
    const padding = values.padding || null
    const backgrounds = section.image ? {
      backgroundImage: `url(${section.image.src})`,
      backgroundAttachment: values.backgroundAttachment,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    } : null
    return (
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
            {text && <div style={{ margin: 16 }}>{renderHTML(text)}</div>}
          </div>
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {this.renderComponents()}
          </div>
        </div>
        { this.props.slides.length ? <Carousels carousels={this.props.slides} /> : null }
      </div>
    )
  }
  render() {
    const { isFetching, section } = this.props
    return (
      !isFetching && this.state.hasImage ?
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        {this.renderContents(section)}
      </CSSTransitionGroup>
      :
      <div>
        {this.renderContents(section)}
      </div>
    )
  }
}

const mapStateToProps = ({ brand, cards, carousels, products, dispatch }, { section }) => {
  const allComponents = [ ...cards.items, ...products.items, ...carousels.items ]
  const components = section.components.map(item => {
    const component = allComponents.find(comp => comp._id === item.componentId)
    return { ...item, ...component }
  })
  const slides = components.filter(comp => comp.type === 'Carousel')
  return {
    isFetching: section.isFetching,
    brand,
    components,
    slides,
    section
  }
}

export default connect(mapStateToProps)(SectionItem)
