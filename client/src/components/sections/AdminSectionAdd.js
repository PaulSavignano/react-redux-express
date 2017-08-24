import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSectionAddSection from './AdminSectionAddSection'
import { fetchAdd as articleSectionAdd } from '../../actions/articles'
import { fetchAdd as cardSectionAdd } from '../../actions/cardSections'
import { fetchAdd as productSectionAdd } from '../../actions/productSections'
import { fetchAdd as swipeableSectionAdd } from '../../actions/swipeableSections'

const sections = [
  { label: 'Article Section', action: articleSectionAdd },
  { label: 'Card Section', action: cardSectionAdd },
  { label: 'Product Section', action: productSectionAdd },
  { label: 'Swipeable Section', action: swipeableSectionAdd },
]

class AdminSectionAdd extends Component {
  state = {
    openMenu: false,
    imageEdit: false,
    anchorEl: null
  }
  handleOpenMenu = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleCloseMenu = () => this.setState({ openMenu: false, anchorEl: null })
  render() {
    return (
      <section style={{ display: 'flex' }}>
        <RaisedButton
          onTouchTap={this.handleOpenMenu}
          label="Add Section"
          type="button"
          primary={true}
          style={{ flex: '1 1 auto', margin: 4 }}
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
            {sections.map(section => (
              <AdminSectionAddSection
                dispatch={dispatch}
                handleCloseMenu={this.handleCloseMenu}
                key={section.label}
                pageId={pageId}
                section={section}
              />
            ))}
            <MenuItem
              primaryText="Contact Form"
              onTouchTap={this.handleAddContactForm}
            />
          </Menu>
        </Popover>
      </section>
    )
  }
}

export default AdminSectionAdd
