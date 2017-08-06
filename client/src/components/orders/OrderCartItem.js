import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card } from 'material-ui/Card'

import loadImage from '../../containers/images/loadImage'
import formatPrice from '../../utils/formatPrice'

class OrderCartItem extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const {
      dispatch,
      item: {
        image,
        productId,
        productQty, 
        name,
        price,
        total
      },
      isFetching
    } = this.props
    return (
      !isFetching &&
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchTap={(e) => {
            e.stopPropagation()
            return dispatch(push(`/products/product/${productId}`))
          }}
          style={{ margin: 16 }}
        >
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            {image && image.src && <img src={image.src} alt="" width="auto" height="50px"/>}
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flex: '1 1 auto',
            }}>
              <span style={{ width: 200, fontSize: '1rem', margin: 16 }}>{name}</span>
              <span style={{ flex: '0 0 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>{formatPrice(price)}</span>
              <span style={{ flex: '0 0 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>
                {productQty}
              </span>
              <span style={{ flex: '0 0 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>{formatPrice(total)}</span>
            </div>
          </div>
        </Card>
    )
  }
}

const mapStateToProps = ({ products: { isFetching, items }}, { item: { productId }}) => ({
  isFetching,
  product: items.find(item => item._id === productId)
})

export default connect(mapStateToProps)(loadImage(OrderCartItem))
