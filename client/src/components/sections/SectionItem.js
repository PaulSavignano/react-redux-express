import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import CardItemContainer from '../../containers/cards/CardItemContainer'
import ProductItemContainer from '../../containers/products/ProductItemContainer'
import SlideList from '../slides/SlideList'

class SectionItem extends Component {
  state = {
    image: null
  }
  componentWillMount() {
    const { image } = this.props.section
    if (image) {
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = (e) => {
        this.setState({ image: src })
      }
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Card':
          return <CardItemContainer key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItemContainer key={component._id} componentId={componentId} />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  renderContents = (section) => {
    const slides = section.components.filter(value => value.type === 'Slide')
    const values = section.values || {}
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
        <section style={{ margin, padding }}>
          {text && <div className="cards">{renderHTML(text)}</div>}
        </section>
        <div>
          {this.renderComponents(section.components)}
        </div>
        { slides.length ? <SlideList slides={slides} /> : null }
      </div>
    )
  }
  render() {
    console.log('inside SectionItem')
    const { section } = this.props
    return (
      this.state.image ?
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

export default SectionItem
