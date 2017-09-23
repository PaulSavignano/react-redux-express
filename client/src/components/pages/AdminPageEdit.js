import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { startEdit } from '../../actions/editItem'
import { fetchAdd } from '../../actions/sections'

const editIcon = <FontIcon className="material-icons">mode_edit</FontIcon>

class AdminPageEdit extends Component {
  handleSectionAdd = () => {
    const { dispatch, page: { _id, slug }} = this.props
    return dispatch(fetchAdd({ pageId: _id, pageSlug: slug }))
  }
  handlePageEdit = (e) => {
    e.stopPropagation()
    const { dispatch, page } = this.props
    return dispatch(startEdit({ item: page, kind: 'PAGE' }))
  }
  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Edit Page Color"
            icon={editIcon}
            onTouchTap={this.handlePageEdit}
          />
          <BottomNavigationItem
            label="Add New Section"
            icon={<ContentAdd />}
            onTouchTap={this.handleSectionAdd}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}


export default AdminPageEdit
