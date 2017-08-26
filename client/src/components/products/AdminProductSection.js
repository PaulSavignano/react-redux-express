import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import productContainer from '../../containers/products/productContainer'
import AdminProduct from './AdminProduct'
import { fetchUpdate, fetchDelete } from '../../actions/productSections'
import { fetchAdd } from '../../actions/products'
import { startEdit } from '../../actions/editItem'

class AdminProductSection extends Component {
  handleAdd = (e) => {
    e.stopPropagation()
    const { dispatch, item: { _id }} = this.props
    return dispatch(fetchAdd({ sectionId: _id }))
  }
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'PRODUCT_SECTION' }))
  }
  render() {
    const {
      item: {
        _id,
        items,
        values: {
          backgroundColor,
          pageLink,
        }
      }
    } = this.props
    return (
      <section
        id={pageLink}
        style={{ backgroundColor }}
        onTouchTap={this.handleStartEdit}
        className="product-section"
      >
        {items.map(item => (
          <AdminProduct
            key={item._id}
            item={item}
          />
        ))}
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <RaisedButton
            label="Add Product"
            onTouchTap={this.handleAdd}
            style={{ margin: 8 }}
          />
          <RaisedButton
            label="Edit Section"
            onTouchTap={this.handleStartEdit}
            style={{ margin: 8 }}
          />
        </div>
      </section>
    )
  }
}

AdminProductSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default AdminProductSection
