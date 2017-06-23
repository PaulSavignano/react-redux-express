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
    const { components } = this.props.section
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Card':
          return <CardItem key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItem key={component._id} componentId={componentId} />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  renderContents = (section) => {
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

const mapStateToProps = (state, { section }) => {
  const slides = section.components.filter(value => value.type === 'Carousel')
  return {
    isFetching: section.isFetching,
    section,
    slides
  }
}

export default connect(mapStateToProps)(SectionItem)
