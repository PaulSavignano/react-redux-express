import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import { Card } from 'material-ui/Card'

import formatPrice from '../../utils/formatPrice'

class OrderCartItem extends Component {
  state = {
    zDepth: 1,
    image: null,
    loading: false
  }
  componentDidMount() {
    const { image } = this.props.product
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { image, loading } = this.state
    const { dispatch, item: { productId, productQty, name, price, total }, isFetching } = this.props
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchTap={() => dispatch(push(`/products/product/${productId}`))}
        >
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            {image && <img src={image} alt="" width="auto" height="100px"/>}
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flex: '1 1 auto',
            }}>
              <span style={{ flex: '1 1 auto', fontSize: '1rem', margin: 16 }}>{name}</span>
              <span style={{ flex: '1 1 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>{formatPrice(price)}</span>
              <span style={{ flex: '1 1 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>
                {productQty}
              </span>
              <span style={{ flex: '1 1 auto', fontSize: '1rem', textAlign: 'right', margin: 16 }}>{formatPrice(total)}</span>
            </div>
          </div>
        </Card>
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ products: { isFetching, items }}, { item: { productId }}) => ({
  isFetching,
  product: items.find(item => item._id === productId)
})

export default connect(mapStateToProps)(OrderCartItem)
