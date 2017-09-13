import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Card } from 'material-ui/Card'

import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'
import { startEdit } from '../../actions/editItem'

class AdminCard extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'CARD',
    }))
  }
  render() {
    return (
      <div onTouchTap={this.handleStartEdit}>
        <CardContent {...this.props} />
      </div>
    )
  }
}

AdminCard.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(AdminCard)
