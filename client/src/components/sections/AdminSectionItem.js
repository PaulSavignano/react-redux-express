import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'

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

class AdminSectionItem extends Component {
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
  componentWillReceiveProps({ item: { image, updatedAt } }) {
    if (image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image.src) return this.setState({ image: null })
  }
  renderComponents = (components) => {
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
  render() {
    const { image, loading } = this.state
    const { dispatch, item, page } = this.props
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
    const backgroundGradientClass = image && { className: 'background-gradient'}
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
          id={item._id}
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
          <section style={{ display: 'flex' }}>
            <RaisedButton
              type="button"
              label="Edit Section"
              style={{ margin: 8, flex: '1 1 auto' }}
              onTouchTap={() => dispatch(startEdit(item._id))}
            />
          </section>
        </div>
        {item.editing &&
          <AdminSectionEdit
            item={item}
            page={page}
          />
        }
      </CSSTransitionGroup>
    )
  }
}

export default connect()(AdminSectionItem)
