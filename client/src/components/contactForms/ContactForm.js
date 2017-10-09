import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import './contactForm.css'
import contactFormContainer from '../../containers/contactForms/contactFormContainer'
import ContactFormContent from './ContactFormContent'

const ContactForm = ({
  dispatch,
  elevation,
  onMouseEnter,
  onMouseLeave,
  item,
  phone,
  user,
}) => (
  <Card
    zDepth={elevation}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="ContactForm"
  >
    <ContactFormContent
      item={item}
      initialValues={user}
    />
  </Card>
)

ContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  phone: PropTypes.string,
  user: PropTypes.object,
}

export default contactFormContainer(ContactForm)
