import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import CardItem from '../../containers/cards/CardItem'
import ContactForm  from '../../containers/users/ContactForm'
import ProductItem from '../../containers/products/ProductItem'
import SlideList from '../../containers/slides/SlideList'

class SectionItem extends Component {
  state = {
    image: null,
    loading: false
  }
  componentDidMount() {
    const { image } = this.props.item
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Contact':
          return <ContactForm key={component._id} componentId={componentId}  />
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
  render() {
    const { image, loading } = this.state
    const { item } = this.props
    const slides = item.components.filter(value => value.type === 'Slide')
    const values = item.values || {}
    const minHeight = values.minHeight || null
    const backgroundColor = values.backgroundColor || null
    const flexFlow = values.flexFlow || 'row wrap'
    const backgrounds = this.state.image && {
      backgroundImage: `url(${this.state.image})`,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    }
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div style={{ minHeight, ...backgrounds, overflow: 'hidden' }}>
          <section style={{ display: 'flex', flexFlow, backgroundColor }}>
            {this.renderComponents(item.components)}
          </section>
          { slides.length ? <SlideList slides={slides} /> : null }
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default SectionItem
