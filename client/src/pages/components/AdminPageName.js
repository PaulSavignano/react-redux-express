import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderSuccessableTextField from '../../modules/renderSuccessableTextField'
import { fetchUpdate, fetchDelete } from '../actions/index'

class AdminPageName extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false,
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true, editing: false })
    if (dirty) this.setState({ submitted: false, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, error, handleSubmit, item, dirty, submitSucceeded } = this.props
    const { _id, name, slug } = item
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardText>
          <form
            style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}
            onBlur={handleSubmit((values) => {
              if (dirty) return dispatch(fetchUpdate(_id, values))
            })}
          >
            <Field
              name="name"
              label="Name"
              type="text"
              component={renderSuccessableTextField}
              style={{ flex: '1 1 auto' }}
            />


            <div style={{ margin: 4 }}>
              <RaisedButton
                onTouchTap={() => dispatch(push(`/admin/pages/${slug}`))}
                type="button"
                label="Edit"
                style={{ margin: 4 }}
                primary={true}
              />
              <RaisedButton
                onTouchTap={() => dispatch(fetchDelete(_id))}
                type="button"
                label="X"
                className="delete-button"
                style={{ margin: 4 }}
                primary={true}
              />
            </div>

          </form>
          {error && <div style={{ color: 'rgb(244, 67, 54)' }}>{error}</div>}
        </CardText>
      </Card>
    )
  }
}

AdminPageName = compose(
  connect((state, { item }) => ({
    form: `page_${item._id}`,
    initialValues: {
      name: item.name
    }
  })),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [] }))(AdminPageName)

export default AdminPageName
