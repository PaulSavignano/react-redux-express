import React from 'react'
import PropTypes from 'prop-types'

import loadImage from '../images/loadImage'
import Article from '../articles/Article'
import ContactForm  from '../../containers/users/ContactForm'
import CardItem from '../cards/CardItem'
import Hero from '../heros/Hero'
import Product from '../products/Product'
import SectionCarousel from '../carousels/SectionCarousel'

const renderComponents = (components) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Article':
        return <Article key={component._id} componentId={componentId} />
      case 'Contact':
        return <ContactForm key={component._id} componentId={componentId} />
      case 'Card':
        return <CardItem key={component._id} componentId={componentId} />
      case 'Carousel':
        return <SectionCarousel key={component._id} componentId={componentId} />
      case 'Hero':
        return <Hero key={component._id} componentId={componentId} />
      case 'Product':
        return <Product key={component._id} componentId={componentId} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

const Section = ({
  item: {
    _id,
    components,
    image,
    values: {
      alignItems,
      backgroundColor,
      containerMarginTop,
      flexFlow,
      justifyContent,
      maxWidth,
      minHeight,
      margin,
      padding,
      pageLink,
    }
  }
}) => {
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
            alignItems,
            display: 'flex',
            flexFlow,
            justifyContent,
            maxWidth,
            minHeight,


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
