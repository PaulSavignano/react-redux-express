import React from 'react'
import PropTypes from 'prop-types'

import loadImage from '../images/loadImage'
import Article from '../articles/Article'
import Button from '../buttons/Button'
import ContactForm  from '../../containers/users/ContactForm'
import CardItem from '../cards/CardItem'
import Iframe from '../iframes/Iframe'
import Image from '../images/Image'
import Product from '../products/Product'
import SectionCarousel from '../carousels/SectionCarousel'
import Text from '../texts/Text'
import Title from '../titles/Title'

const renderComponents = (components) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Article':
        return <Article key={component._id} componentId={componentId} />
      case 'Button':
        return <Button key={component._id} componentId={componentId} />
      case 'Contact':
        return <ContactForm key={component._id} componentId={componentId} />
      case 'Card':
        return <CardItem key={component._id} componentId={componentId} />
      case 'Carousel':
        return <SectionCarousel key={component._id} componentId={componentId} />
      case 'Iframe':
        return <Iframe key={component._id} componentId={componentId} />
      case 'Image':
        return <Image key={component._id} componentId={componentId} />
      case 'Product':
        return <Product key={component._id} componentId={componentId} />
      case 'Text':
        return <Text key={component._id} componentId={componentId} />
      case 'Title':
        return <Title key={component._id} componentId={componentId} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

const Section = ({
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

Section.propTypes = {
  item: PropTypes.object.isRequired
}

export default loadImage(Section)
