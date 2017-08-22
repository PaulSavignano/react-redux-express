import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import loadImage from '../images/loadImage'
import AdminSectionEditButton from './AdminSectionEditButton'
import AdminArticle from '../articles/AdminArticle'
import AdminCard from '../cards/AdminCard'
import AdminSectionCarousel from '../carousels/AdminSectionCarousel'
import AdminContactForm  from '../../containers/users/AdminContactForm'
import AdminHero from '../heros/AdminHero'
import AdminProduct from '../products/AdminProduct'
import AdminSectionEdit from '../sections/AdminSectionEdit'
import { startEdit } from '../../actions/sections'

const renderComponents = (components, item) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Article':
        return <AdminArticle key={component._id} componentId={componentId} />
      case 'Contact':
        return <AdminContactForm key={component._id} componentId={componentId} sectionId={item._id} />
      case 'Carousel':
        return <AdminSectionCarousel key={component._id} componentId={componentId} />
      case 'Card':
        return <AdminCard key={component._id} componentId={componentId} />
      case 'Hero':
        return <AdminHero key={component._id} componentId={componentId} />
      case 'Product':
        return <AdminProduct key={component._id} componentId={componentId} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

const AdminSection = ({ dispatch, item, pageSlug }) => {
  const {
    _id,
    components,
    editing,
    image,
    values: {
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
  } = item
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <div
      id={pageLink ? pageLink : _id}
      style={{
        ...backgroundImage,
        backgroundColor,
        marginTop: containerMarginTop,
      }}
      {...backgroundImageClass}
    >
      <section style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          flexFlow,
          minHeight: minHeight || '64px',
          justifyContent,
          alignItems,
          margin,
          padding
        }}>
          {renderComponents(components, item)}
        </div>
        <AdminSectionEditButton
          _id={_id}
          dispatch={dispatch}
        />
        {editing &&
          <AdminSectionEdit
            item={item}
            pageSlug={pageSlug}
            sectionId={item._id}
          />
        }
      </section>
    </div>
  )
}

export default loadImage(AdminSection)
