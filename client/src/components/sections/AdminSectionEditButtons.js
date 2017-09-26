import React, { Component } from 'react'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'
import FontIcon from 'material-ui/FontIcon'

import buttonContainer from '../../containers/buttons/buttonContainer'
import AdminSectionAddComponent from './AdminSectionAddComponent'
import { startEdit } from '../../actions/editItem'
import { fetchAdd as articleAdd } from '../../actions/articles'
import { fetchAdd as cardAdd } from '../../actions/cards'
import { fetchAdd as contactFormAdd } from '../../actions/contactForms'
import { fetchAdd as heroAdd } from '../../actions/heros'
import { fetchAdd as productAdd } from '../../actions/products'

const EditIcon = () => <FontIcon className="material-icons">mode_edit</FontIcon>

const components = [
  { label: 'Article', action: articleAdd },
  { label: 'Card', action: cardAdd },
  { label: 'ContactForm', action: contactFormAdd },
  { label: 'Hero', action: heroAdd },
  { label: 'Product', action: productAdd }
]

class AdminSectionEditButtons extends Component {
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
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  render() {
    const {
      dispatch,
      item,
      pageId,
      pageSlug,
    } = this.props
    return (
      <div className="AdminSectionEditButtons">
        <div>
          <FloatingActionButton
            onTouchTap={this.handleOpenMenu}
            className="edit-section"
          >
            <ContentAdd />
          </FloatingActionButton>
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
                  sectionId={item._id}
                />
              ))}
            </Menu>
          </Popover>
          <FloatingActionButton
            onTouchTap={this.handleStartEdit}
            className="edit-section"
          >
            <EditIcon />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

export default buttonContainer(AdminSectionEditButtons)
