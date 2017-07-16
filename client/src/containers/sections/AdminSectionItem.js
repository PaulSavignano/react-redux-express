import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSectionEdit from './AdminSectionEdit'
import AdminCardItem from '../cards/AdminCardItem'
import ContactForm  from '../users/ContactForm'
import ProductItemContainer from '../products/ProductItemContainer'
import SlideList from '../../components/slides/SlideList'

class AdminSectionItem extends Component {
  state = {
    image: null,
    loading: false,
    open: false
  }
  componentDidMount() {
    const { image } = this.props.item
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Contact':
          return <ContactForm key={component._id} componentId={componentId}  />
        case 'Card':
          return <AdminCardItem key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItemContainer key={component._id} componentId={componentId} />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  handleOpen = () => this.setState({ open: true})
  handleClose = () => this.setState({ open: false})
  render() {
    const { image, loading, open } = this.state
    const { item, page } = this.props
    const slides = item.components.filter(value => value.type === 'Slide')
    const values = item.values || {}
    const text = values.text || null
    const height = values.height || null
    const backgroundColor = values.backgroundColor || null
    const margin = values.margin || null
    const padding = values.padding || null
    const flexFlow = values.flexFlow || 'row wrap'
    const backgrounds = this.state.image && {
      backgroundImage: `url(${item.image.src})`,
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
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div
          style={{ height, ...backgrounds, overflow: 'hidden' }}
        >
          {text && text.length > 8 &&
            <section style={{ margin, padding }}>
              <div>{renderHTML(text)}</div>
            </section>
          }
          <section style={{ backgroundColor }}>
            <div style={{ display: 'flex', flexFlow }}>
              {this.renderComponents(item.components)}
            </div>
            <RaisedButton
              type="button"
              label="Edit Section"
              fullWidth={true}
              onTouchTap={() => this.handleOpen()}
            />
          </section>
          { slides.length ? <SlideList slides={slides} /> : null }
        </div>
        {open &&
          <AdminSectionEdit
            item={item}
            page={page}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            open={open}
          />
        }
      </CSSTransitionGroup>
    )
  }
}

export default AdminSectionItem
