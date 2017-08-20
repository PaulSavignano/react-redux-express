import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../../actions/sections'

class AdminSectionAdd extends Component {
  handleAdd = () => {
    const { dispatch, pageId, pageSlug } = this.props
    return dispatch(fetchAdd({ pageId, pageSlug }))
  }
  render() {
    return (
      <section style={{ display: 'flex' }}>
        <RaisedButton
          label="Add New Section"
          primary={true}
          style={{ margin: '4px 8px 8px', flex: '1 1 auto' }}
          onTouchTap={this.handleAdd}
        />
      </section>
    )
  }
}

export default AdminSectionAdd
