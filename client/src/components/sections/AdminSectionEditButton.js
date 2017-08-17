import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { startEdit } from '../../actions/sections'

class AdminSectionEditButton extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 5 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { _id, dispatch } = this.props
    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ display: 'flex', position: 'absolute', bottom: 16, right: 16 }}>
        <RaisedButton
          type="button"
          label="Edit Section"
          onTouchTap={() => dispatch(startEdit(_id))}
        />
      </Paper>
    )
  }
}

export default AdminSectionEditButton
