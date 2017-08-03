import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderSuccessableTextField from '../../components/fields/renderSuccessableTextField'
import { fetchUpdate, fetchDelete } from '../../actions/pages'

class AdminPagesItem extends Component {
  state = {
    zDepth: 1,
    editing: false,
  }
  componentWillReceiveProps({ submitSucceeded, dirty }) {
    if (submitSucceeded) this.setState({ editing: false })
    if (dirty) this.setState({ editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, handleSubmit, item, dirty } = this.props
    const { _id, slug } = item
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="vertical-card"
      >
        <form
          onBlur={handleSubmit((values) => {
            if (dirty) return dispatch(fetchUpdate(_id, values))
          })}
          style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', padding: '8px 8px 16px 8px' }}
        >
          <Field
            name="name"
            label="Name"
            type="text"
            component={renderSuccessableTextField}
            style={{ flex: '1 1 auto', margin: '8px 8px 16px 8px' }}
          />
          <div>
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
      </Card>
    )
  }
}

AdminPagesItem = compose(
  connect((state, { item }) => ({
    form: `page_${item._id}`,
    initialValues: {
      name: item.name
    }
  })),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [] }))(AdminPagesItem)

export default AdminPagesItem
