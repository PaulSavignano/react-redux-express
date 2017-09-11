import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import AdminSectionAddComponent from './AdminSectionAddComponent'
import { fetchAdd as articleAdd } from '../../actions/articles'
import { fetchAdd as cardAdd } from '../../actions/cards'
import { fetchAdd as contactFormAdd } from '../../actions/contactForms'
import { fetchAdd as heroAdd } from '../../actions/heros'
import { fetchAdd as productAdd } from '../../actions/products'

const components = [
  { label: 'Article', action: articleAdd },
  { label: 'Card', action: cardAdd },
  { label: 'ContactForm', action: contactFormAdd },
  { label: 'Hero', action: heroAdd },
  { label: 'Product', action: productAdd }
]

class AdminSectionAdd extends Component {
  state = {
    openMenu: false,
    imageEdit: false,
    anchorEl: null
  }
  handleOpenMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleCloseMenu = () => this.setState({ openMenu: false, anchorEl: null })
  render() {
    const {
      dispatch,
      pageId,
      pageSlug,
      sectionId
    } = this.props
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleOpenMenu}
          label="Add Item"
          className="edit-section"
        />
        <Popover
          open={this.state.openMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.setState({ openMenu: false })}
          animation={PopoverAnimationVertical}
          style={{ flex: '1 1 auto', width: 'auto' }}
        >
          <Menu autoWidth={true}>
            {components.map(component => (
              <AdminSectionAddComponent
                action={component.action}
                component={component}
                dispatch={dispatch}
                handleCloseMenu={this.handleCloseMenu}
                key={component.label}
                pageId={pageId}
                pageSlug={pageSlug}
                sectionId={sectionId}
              />
            ))}
          </Menu>
        </Popover>
      </div>
    )
  }
}

AdminSectionAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
}

export default AdminSectionAdd
