import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { fetchUpdate, fetchDelete } from '../actions/index'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    errorText={touched && error}
    autoFocus={true}
    {...input}
    {...custom}
  />
)


      const styles = {
        CardText: {
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center'
        },
        name: {
          flex: '1 1 auto'
        },
        RaisedButton: {
          alignSelf: 'flex-end'
        }
      }

class AdminPageName extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true, editing: false })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, error, handleSubmit, submitSucceeded, item } = this.props
    const { _id, name, slug } = item
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardText>
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
            {this.state.editing ?
              <Field
                name="name"
                label="Name"
                type="text"
                component={renderTextField}
                style={{ flex: '1 1 auto' }}
                onBlur={handleSubmit((values) => {
                  dispatch(fetchUpdate(_id, values))
                  this.setState({ editing: false })
                })}
              />
                  :
              <div style={{ flex: '1 1 auto' }}>
                <div onTouchTap={() => this.setState({ editing: true })}>
                  {name}
                </div>
                {error && <div style={{ color: 'rgb(244, 67, 54)' }}>{error}</div>}
              </div>
            }
            <RaisedButton
              onTouchTap={() => dispatch(push(`/admin/pages/${slug}`))}
              label="Edit"
              primary={true}
            />
            <RaisedButton
              onTouchTap={() => dispatch(fetchDelete(_id))}
              label="X"
              primary={true}
              style={{ marginLeft: 16 }}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

AdminPageName = compose(
  connect((state, props) => ({
    form: `page_${props.item._id}`,
    initialValues: props.item
  })),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [] }))(AdminPageName)

export default AdminPageName
