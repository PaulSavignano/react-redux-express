import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cardContainer from '../../containers/cards/cardContainer'
import AdminItemForm from '../forms/AdminItemForm'
import AdminCardItem from './AdminCardItem'
import { fetchUpdate, fetchDelete } from '../../actions/cardSections'
import { startEdit } from '../../actions/editItem'

import renderTextField from '../fields/renderTextField'

const fields = [
  { name: 'backgroundColor', type: 'text', component: renderTextField },
  { name: 'pageLink', type: 'text',  component: renderTextField }
]

class AdminCardSection extends Component {
  handleStartEdit = () => {
    const { dispatch, item } = this.props
    dispatch(startEdit(item, 'ARTICLE_SECTION'))
  }
  render() {
    const {
      cardStyle,
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
          <AdminCardItem
            cardStyle={cardStyle}
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
        {editItem.editing && editItem.kind === 'CARD_SECTION' ?
          <AdminItemForm
            form={`cardSection_${editItem.item._id}`}
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

AdminCardSection.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  editItem: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(AdminCardSection)
