import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import ButtonItem from '../../containers/buttons/ButtonItem'
import CardItem from '../../containers/cards/CardItem'
import ContactForm  from '../../containers/users/ContactForm'
import IframeItem from '../../containers/iframes/IframeItem'
import ImageItem from '../../containers/images/ImageItem'
import ProductItem from '../../containers/products/ProductItem'
import SlideList from '../../containers/slides/SlideList'
import TextItem from '../../containers/texts/TextItem'

class SectionItem extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image.src) {
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Button':
          return <ButtonItem key={component._id} componentId={componentId}  />
        case 'Contact':
          return <ContactForm key={component._id} componentId={componentId}  />
        case 'Card':
          return <CardItem key={component._id} componentId={componentId}  />
        case 'Iframe':
          return <IframeItem key={component._id} componentId={componentId}  />
        case 'Image':
          return <ImageItem key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItem key={component._id} componentId={componentId} />
        case 'Text':
          return <TextItem key={component._id} componentId={componentId}  />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  render() {
    const { loading, image } = this.state
    const { item } = this.props
    const {
      backgroundColor,
      flexFlow,
      justifyContent,
      alignItems,
      margin,
      minHeight
    } = item.values
    const slides = item.components.filter(value => value.type === 'Slide')
    const backgroundClass = image && { className: 'background-image' }
    const marginTop = image && 64
    const backgrounds = image && {
      marginTop: -64,
      background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,0) 2%,rgba(0,0,0,.08) 28%,rgba(0,0,0,.5) 75%,rgba(0,0,0,.7) 100%), url(${image})`,
      transition: 'all 100ms ease-in-out',
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
        <div id={item._id} style={{ ...backgrounds, backgroundColor, overflow: 'hidden'}} {...backgroundClass}>
          <div style={{ marginTop }}>
            <section style={{
              display: 'flex',
              flexFlow,
              minHeight,
              justifyContent,
              alignItems,
              margin
            }}>
              {this.renderComponents(item.components)}
            </section>
            { !slides.length ? null :
            <section style={{ backgroundColor }}>
              <SlideList slides={slides} />
            </section>
            }
          </div>

        </div>

      </CSSTransitionGroup>
    )
  }
}

export default SectionItem
