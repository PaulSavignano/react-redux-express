import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import loadImage from '../../containers/images/loadImage'
import AdminButtonItem from '../../containers/buttons/AdminButtonItem'
import AdminCardItem from '../../containers/cards/AdminCardItem'
import AdminContactForm  from '../../containers/users/AdminContactForm'
import AdminIframeItem from '../../containers/iframes/AdminIframeItem'
import AdminImageItem from '../../containers/images/AdminImageItem'
import AdminProductItem from '../../containers/products/AdminProductItem'
import AdminSectionEdit from '../../containers/sections/AdminSectionEdit'
import AdminTextItem from '../../containers/texts/AdminTextItem'
import AdminTitleItem from '../../containers/titles/AdminTitleItem'
import { startEdit } from '../../actions/sections'

const renderComponents = (components) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Button':
        return <AdminButtonItem key={component._id} componentId={componentId}  />
      case 'Contact':
        return <AdminContactForm key={component._id} componentId={componentId} sectionId={this.props.item._id}  />
      case 'Card':
        return <AdminCardItem key={component._id} componentId={componentId}  />
      case 'Iframe':
        return <AdminIframeItem key={component._id} componentId={componentId} />
      case 'Image':
        return <AdminImageItem key={component._id} componentId={componentId} />
      case 'Product':
        return <AdminProductItem key={component._id} componentId={componentId} />
      case 'Text':
        return <AdminTextItem key={component._id} componentId={componentId} />
      case 'Title':
        return <AdminTitleItem key={component._id} componentId={componentId} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

const AdminSectionItem = ({ dispatch, item, page }) => {
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
      minHeight
    }
  } = item
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
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
        {renderComponents(components)}
      </section>
      <section style={{ display: 'flex' }}>
        <RaisedButton
          type="button"
          label="Edit Section"
          style={{ margin: 8, flex: '1 1 auto' }}
          onTouchTap={() => dispatch(startEdit(_id))}
        />
      </section>
      {editing &&
        <AdminSectionEdit
          item={item}
          page={page}
        />
      }
    </div>
  )
}

export default connect()(loadImage(AdminSectionItem))
