import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import history from '../../containers/routers/history'
import loadImage from '../images/loadImage'
import formatPrice from '../../utils/formatPrice'
import slugIt from '../../utils/slugIt'

class OrderCartItem extends Component {
  state = {
    elevation: 1
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleNavigation = (e) => {
    e.stopPropagation()
    const { item: { name, productId }} = this.props
    return history.push(`/products/${slugIt(name)}/${productId}`)
  }
  render() {
    const {
      item: {
        image,
        productQty,
        name,
        price,
        total
      },
    } = this.props
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleNavigation}
        className="card"
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

OrderCartItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default loadImage(OrderCartItem)
