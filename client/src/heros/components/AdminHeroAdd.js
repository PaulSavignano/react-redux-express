import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { fetchAdd, fetchDelete } from '../actions/index'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminHeroAdd extends Component {
  render() {
    const { error, handleSubmit, page, item, dispatch, handleExpand, expanded } = this.props
    return (
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            if (expanded && item._id) {
              dispatch(fetchDelete(item._id, item.image))
            } else {
              const add = {
                pageId: page._id,
                pageName: page.slug,
              }
              dispatch(fetchAdd(add))
            }
            handleExpand()
          }}
          type="button"
          label={expanded ? "Remove Hero" : "Add Hero"}
          labelColor="#ffffff"
          backgroundColor={expanded ? "#D50000" : "#4CAF50" }
          fullWidth={true}/>
      </CardActions>
    )
  }
}


export default reduxForm({
  form: 'AdminHeroAdd',
})(AdminHeroAdd)
