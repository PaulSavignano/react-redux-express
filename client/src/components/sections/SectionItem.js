import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import ButtonItem from '../../containers/buttons/ButtonItem'
import ContactForm  from '../../containers/users/ContactForm'
import CardItem from '../../containers/cards/CardItem'
import Carousel from '../../containers/slides/Carousel'
import IframeItem from '../../containers/iframes/IframeItem'
import ImageItem from '../../containers/images/ImageItem'
import ProductItem from '../../containers/products/ProductItem'
import TextItem from '../../containers/texts/TextItem'
import TitleItem from '../../containers/titles/TitleItem'

class SectionItem extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image && image.src) {
      const img = new Image()
      const src = image.src
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
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
        case 'Title':
          return <TitleItem key={component._id} componentId={componentId}  />
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
      _id,
      backgroundColor,
      containerMarginTop,
      flexFlow,
      justifyContent,
      alignItems,
      margin,
      padding,
      minHeight
    } = item.values
    const backgroundImage = image && { backgroundImage: `url(${image})`,   transition: 'all 600ms ease-in-out' }
    const backgroundImageClass = image && { className: 'background-image' }
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div
          id={_id}
          style={{
            ...backgroundImage,
            backgroundColor,
            marginTop: containerMarginTop
          }}
          {...backgroundImageClass}
        >
          <section style={{
              display: 'flex',
              flexFlow,
              minHeight,
              justifyContent,
              alignItems,
              margin,
              padding
          }}>
            {this.renderComponents(item.components)}
          </section>
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default SectionItem
