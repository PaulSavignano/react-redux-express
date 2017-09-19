import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import history from '../../containers/routers/history'
import renderSuccessableTextField from '../../components/fields/renderSuccessableTextField'
import { fetchUpdate, fetchDelete } from '../../actions/pages'

class AdminPagesItem extends Component {
  state = {
    elevation: 1
  }
  handleNavigation = () => {
    const { item: { slug }} = this.props
    history.push(`/admin/pages/${slug}`)
  }
  handleRemove = () => {
    const { dispatch, item: { _id }} = this.props
    dispatch(fetchDelete(_id))
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleFormSubmit = (values) => {
    const { dirty, dispatch, item: { _id }} = this.props
    if (dirty) return dispatch(fetchUpdate(_id, values))
  }
  render() {
    const {
      dispatch,
      handleSubmit,
      item,
      dirty
    } = this.props
    const { _id } = item
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
      >
        <form
          onBlur={handleSubmit(this.handleFormSubmit)}
          style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', padding: '8px 8px 16px 8px' }}
        >
          <Field
            name="name"
            label="Name"
            type="text"
            component={renderSuccessableTextField}
          />
          <div>
            <RaisedButton
              onTouchTap={this.handleNavigation}
              type="button"
              label="Edit"
              style={{ margin: 4 }}
              primary={true}
            />
            <RaisedButton
              onTouchTap={this.handleRemove}
              type="button"
              label="X"
              className="delete-button"
              style={{ margin: 4 }}
              primary={true}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminPagesItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default reduxForm({})(AdminPagesItem)
