import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { startEdit } from '../../actions/editItem'
import { fetchAdd } from '../../actions/sections'

const editIcon = <FontIcon className="material-icons">mode_edit</FontIcon>

class AdminPageEditButtons extends Component {
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
    const { textColor } = this.props
    return (
      <Paper zDepth={1} className="admin-page-edit">
        <BottomNavigation>
          <BottomNavigationItem
            label="Edit Page Color"
            icon={editIcon}
            onTouchTap={this.handlePageEdit}
          />
          <BottomNavigationItem
            label="Add New Section"
            icon={<ContentAdd color={textColor} />}
            onTouchTap={this.handleSectionAdd}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

AdminPageEditButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  textColor: PropTypes.string,
}


export default AdminPageEditButtons
