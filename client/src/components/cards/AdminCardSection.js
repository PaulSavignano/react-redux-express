import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import cardContainer from '../../containers/cards/cardContainer'
import AdminCard from './AdminCard'
import { fetchUpdate, fetchDelete } from '../../actions/cardSections'
import { fetchAdd } from '../../actions/cards'
import { startEdit } from '../../actions/editItem'

class AdminCardSection extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'CARD_SECTION' }))
  }
  handleAdd = (e) => {
    e.stopPropagation()
    const { dispatch, item: { _id }} = this.props
    console.log(_id)
    return dispatch(fetchAdd({ sectionId: _id }))
  }
  render() {
    const {
      dispatch,
      item: {
        _id,
        items,
        image,
        values
      }
    } = this.props
    const backgroundColor = values && values.backgroundColor
    const pageLink = values && values.pageLink
    const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
    const backgroundImageClass = image && image.src && { className: 'background-image' }
    return (
      <section
        id={pageLink}
        onTouchTap={this.handleStartEdit}
        style={{
          ...backgroundImage,
          backgroundColor,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 60
        }}
        {...backgroundImageClass}
        className="card-section"
      >
        {items.map(item => (
          <AdminCard
            key={item._id}
            item={item}
          />
        ))}
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <RaisedButton
            label="Add Card"
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

AdminCardSection.propTypes = {
  item: PropTypes.object.isRequired
}

export default AdminCardSection
