import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'

import AdminButtonItem from '../../containers/buttons/AdminButtonItem'
import AdminCardItem from '../../containers/cards/AdminCardItem'
import AdminContactForm  from '../../containers/users/AdminContactForm'
import AdminProductItem from '../../containers/products/AdminProductItem'
import AdminSectionEdit from '../../containers/sections/AdminSectionEdit'
import AdminSlideList from '../../containers/slides/AdminSlideList'
import { startEdit } from '../../actions/sections'

class AdminSectionItem extends Component {
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
        case 'Product':
          return <AdminProductItem key={component._id} componentId={componentId} />
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
      backgroundColor,
      flexFlow,
      justifyContent,
      alignItems,
      margin,
      height
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
        {item.editing &&
          <AdminSectionEdit
            item={item}
            page={page}
          />
        }
        <div style={{ ...backgrounds, overflow: 'hidden' }} {...backgroundClass}>
          <div style={{ marginTop }}>
            <section style={{
              display: 'flex',
              backgroundColor,
              flexFlow,
              height,
              justifyContent,
              alignItems,
              margin
            }}>
              {this.renderComponents(item.components)}
              {slides.length ? <AdminSlideList slides={slides} /> : null }
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

        </div>
      </CSSTransitionGroup>
    )
  }
}

export default AdminSectionItem
