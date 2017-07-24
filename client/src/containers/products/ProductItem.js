import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import formatPrice from '../../utils/formatPrice'
import { fetchAddToCart } from '../../actions/cart'

class ProductItem extends Component {
  state = {
    qty: 1,
    zDepth: 1,
    image: null,
    loading: false,
    open: false
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
  render() {
    const { image, loading } = this.state
    const { dispatch, handleSubmit, item, isFetching, submitSucceeded, submitting  } = this.props
    const { _id, slug } = item
    const values = item.values || {}
    const margin = values.margin || null
    const width = values.width || null
    const name = values.name || null
    const description = values.description || null
    const price = values.price || null
    return (
      !isFetching && !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
        style={{ margin, width, flex: '1 1 auto' }}
      >
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >

          {image &&
            <CardMedia onTouchTap={() => dispatch(push(`/${slug}`))}>
              <img src={image} alt={name} />
            </CardMedia>
          }
          <CardTitle title={
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <div>{name}</div>
              <div>{formatPrice(price)}</div>
            </div>
          }
          />
          <CardText>{description}</CardText>
          <form
            onSubmit={handleSubmit(values => {
              const update = {
                type: 'ADD_TO_CART',
                productId: _id,
                productQty: this.state.qty,
              }
              return dispatch(fetchAddToCart(update))
            })}
          >
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
              <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: '24px' }} />
              <div style={{ flex: '1 1 auto', textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)' }}>
                {this.state.qty}
              </div>
              <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
            </div>
            <div style={{ display: 'flex' }}>
              <SuccessableButton
                submitSucceeded={submitSucceeded}
                submitting={submitting}
                label="Add To Cart"
                successLabel="Product Added!"
              />
            </div>
          </form>


          {!this.state.open ? null :
          <Dialog
            actions={
              <div>
                <FlatButton
                  label="Cart"
                  primary={true}
                  onTouchTap={() => {
                    dispatch(push('/cart'))
                    this.setState({ open: false })
                  }}
                />
                <FlatButton
                  label="Close"
                  primary={true}
                  onTouchTap={() => this.setState({ open: false })}
                />
              </div>
            }
            actionsContainerStyle={{ textAlign: 'center' }}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            bodyStyle={{ textAlign: 'center', fontSize: 24 }}
          >
            Added To Cart!
          </Dialog>
          }
        </Card>
      </CSSTransitionGroup>
    )
  }
}


ProductItem = compose(
  connect((state, { item }) => ({
      form: `addToCart_${item._id}`,
    })
  ),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [] }))(ProductItem)

export default ProductItem
