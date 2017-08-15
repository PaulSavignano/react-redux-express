import React from 'react'
import PropTypes from 'prop-types'

import loadImage from '../../containers/images/loadImage'
import ButtonItem from '../buttons/ButtonItem'
import ContactForm  from '../../containers/users/ContactForm'
import CardItem from '../../containers/cards/CardItem'
import IframeItem from '../iframes/IframeItem'
import ImageItem from '../images/ImageItem'
import ProductItem from '../../containers/products/ProductItem'
import SectionCarousel from '../carousels/SectionCarousel'
import TextItem from '../texts/TextItem'
import TitleItem from '../titles/TitleItem'

const renderComponents = (components) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Button':
        return <ButtonItem key={component._id} componentId={componentId}  />
      case 'Contact':
        return <ContactForm key={component._id} componentId={componentId}  />
      case 'Card':
        return <CardItem key={component._id} componentId={componentId}  />
      case 'Carousel':
        return <SectionCarousel key={component._id} componentId={componentId}  />
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

const SectionItem = ({
  item: {
    components,
    image,
    values: {
      _id,
      backgroundColor,
      containerMarginTop,
      flexFlow,
      justifyContent,
      alignItems,
      margin,
      padding,
      pageLink,
      minHeight
    }
  }
}) => {
  const slides = components.filter(item => item.type === 'Slide')
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <div
      style={{
        ...backgroundImage,
        backgroundColor,
        marginTop: containerMarginTop
      }}
      {...backgroundImageClass}
    >
      <section>
        <div
          id={pageLink ? pageLink : _id}
          style={{
            display: 'flex',
            flexFlow,
            minHeight,
            justifyContent,
            alignItems,
            margin,
            padding
          }}
        >
          {renderComponents(components)}
        </div>
      </section>
    </div>
  )
}

SectionItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default loadImage(SectionItem)
