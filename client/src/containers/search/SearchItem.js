import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import renderHTML from 'react-render-html'

import { searchDelete } from '../../actions/search'

class SearchItem extends Component {
  state = {
    elevation: 1,
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  render() {
    const { dispatch, item } = this.props
    const { _id, values, image, pageSlug, productSlug } = item.item
    const slug = item.productSlug ? `products/${productSlug}` : pageSlug
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => {
          dispatch(searchDelete())
          return dispatch(push(`/${slug}#${_id}`))
        }}
        containerStyle={{ display: 'flex', flexFlow: 'row', margin: 16 }}
      >
        {item.image && <img src={image.src} alt="search result" style={{ maxHeight: 100 }}/>}
        <div>
          {values.h1Text && <CardTitle>{values.h1Text}</CardTitle>}
          {values.h2Text && <CardTitle>{values.h2Text}</CardTitle>}
          {values.h3Text && <CardTitle>{values.h3Text}</CardTitle>}
          {values.pText && <CardTitle>{values.pText}</CardTitle>}
          {values.name && <CardTitle>{values.name}</CardTitle>}
          {values.description && <CardText style={{paddingTop: 0}}>{values.description}</CardText>}
          {values.detail && <CardText style={{paddingTop: 0}}>{values.detail}</CardText>}
          {values.text && <CardText style={{paddingTop: 0}}>{renderHTML(values.text)}</CardText>}
        </div>
      </Card>
    )
  }
}


export default connect()(SearchItem)
