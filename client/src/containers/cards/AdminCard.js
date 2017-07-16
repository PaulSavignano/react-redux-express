import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AdminCardItem from './AdminCardItem'
import CardItem from '../../components/cards/CardItem'

class AdminCard extends Component {
  state = {
    editing: false
  }
  handleTouchTap = () => {
    this.setState({ editing: !this.state.editing })
  }
  render() {
    const { editing } = this.state
    const { dispatch, isFetching, item, imageSpec } = this.props
    return (
      !isFetching && editing ?
      <Dialog
        actions={
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleTouchTap}
          />
        }
        modal={false}
        open={this.state.editing}
        onRequestClose={this.handleTouchTap}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <AdminCardItem
          item={item}
          imageSpec={imageSpec}
        />
      </Dialog>

      :
      <CardItem
        dispatch={dispatch}
        item={item}
        handleTouchTap={this.handleTouchTap}
      />
    )
  }
}

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId)
  return {
    item,
    isFetching
  }
}

export default connect(mapStateToProps)(AdminCard)
