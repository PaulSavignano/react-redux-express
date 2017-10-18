import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './contactForm.css'
import contactFormContainer from '../../containers/contactForms/contactFormContainer'
import ContactFormContent from './ContactFormContent'
import { startEdit } from '../../actions/editItem'

class AdminContactForm extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'CONTACT_FORM',
    }))
  }
  render() {
    const {
      elevation,
      onMouseEnter,
      onMouseLeave,
      item,
      user,
      phone
    } = this.props
    return (
      <Card
        zDepth={elevation}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchTap={this.handleStartEdit}
        className="AdminContactForm"
      >
        <ContactFormContent
          item={item}
          initialValues={user}
          phone={phone}
        />
      </Card>
    )
  }
}

AdminContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  phone: PropTypes.string,
  user: PropTypes.object,
}

export default contactFormContainer(AdminContactForm)
