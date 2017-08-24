import React, { Component } from 'react'
import PropTypes from 'prop-types'

import productContainer from '../../containers/cards/productContainer'
import AdminItemForm from '../forms/AdminItemForm'
import AdminProduct from './AdminProduct'
import { fetchUpdate, fetchDelete } from '../../actions/productSections'
import { startEdit } from '../../actions/editItem'

import renderTextField from '../fields/renderTextField'

const fields = [
  { name: 'backgroundColor', type: 'text', component: renderTextField },
  { name: 'pageLink', type: 'text',  component: renderTextField }
]

class AdminProductSection extends Component {
  handleStartEdit = () => {
    const { dispatch, item } = this.props
    dispatch(startEdit(item, 'PRODUCT_SECTION'))
  }
  render() {
    const {
      productStyle,
      cursor,
      editItem,
      events,
      hasButtons,
      hasHeading,
      hasMedia,
      hasParagraph,
      item: {
        _id,
        cards,
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
      >
        {cards.map(card => (
          <AdminProduct
            productStyle={productStyle}
            cursor={cursor}
            editItem={editItem}
            events={events}
            hasButtons={hasButtons}
            hasHeading={hasHeading}
            hasMedia={hasMedia}
            hasParagraph={hasParagraph}
            item={card}
          />
        ))}
        {editItem.editing && editItem.kind === 'PRODUCT_SECTION' ?
          <AdminItemForm
            form={`productSection_${editItem.item._id}`}
            editItem={editItem}
            initialValues={editItem.item.values}
            fields={fields}
            dispatch={dispatch}
            fetchUpdate={fetchUpdate}
            fetchDelete={fetchDelete}
          />
        : null}
      </section>
    )
  }
}

AdminProductSection.propTypes = {
  productStyle: PropTypes.object.isRequired,
  editItem: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default productContainer(AdminProductSection)
