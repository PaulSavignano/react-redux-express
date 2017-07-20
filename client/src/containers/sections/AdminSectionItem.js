import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSectionEdit from './AdminSectionEdit'
import AdminCardItem from '../cards/AdminCardItem'
import AdminContactForm  from '../users/AdminContactForm'
import AdminProductItem from '../products/AdminProductItem'
import AdminSlideList from '../slides/AdminSlideList'
import { startEdit } from '../../actions/sections'

class AdminSectionItem extends Component {
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
  componentWillReceiveProps({ item: { image, updatedAt } }) {
    console.log('section is receving props')
    if (image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image.src) return this.setState({ image: null })
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Contact':
          return <AdminContactForm key={component._id} componentId={componentId}  />
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
    const { loading } = this.state
    const { dispatch, item, page } = this.props
    const {
      backgroundColor,
      flexFlow,
      justifyContent,
      margin,
      minHeight
    } = item.values
    const slides = item.components.filter(value => value.type === 'Slide')
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
        {item.editing &&
          <AdminSectionEdit
            item={item}
            page={page}
          />
        }
        <div style={{ ...backgrounds, overflow: 'hidden' }}>
          <section style={{
            backgroundColor,
            flexFlow,
            justifyContent,
            margin,
            minHeight
          }}>
            {this.renderComponents(item.components)}
            {slides.length ? <AdminSlideList slides={slides} /> : null }
          </section>
          <section>
            <RaisedButton
              type="button"
              label="Edit Section"
              fullWidth={true}
              onTouchTap={() => dispatch(startEdit(item._id))}
            />
          </section>
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default AdminSectionItem
