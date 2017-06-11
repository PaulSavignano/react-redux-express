import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCarouselItem extends Component {
  state = {
    zDepth: 1,
    submitted: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { error, handleSubmit, dispatch, carousel, imageSize } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        className="cards"
      >
        <ImageForm
          type="image/jpg"
          handleUpdate={fetchUpdate}
          width={imageSize.width}
          height={imageSize.height}
          ref={this.setEditorRef}
          item={carousel}
        />
        <form
          onSubmit={handleSubmit((values) => {
            const type = 'UPDATE_VALUES'
            const update = { type, values }
            dispatch(fetchUpdate(carousel._id, update))
          })}
          style={{ flex: '1 1 auto', margin: 32 }}
        >
          <CardText>
            <Field
              name="text"
              label="text"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}

          </CardText>
          <div style={{ flex: '1 1 auto' }}></div>
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: '8px 4px 8px 8px' }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: '8px 8px 8px 4px' }}
              onTouchTap={() => {
                dispatch(fetchDelete(carousel._id, carousel.image))
              }}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

AdminCarouselItem = compose(
  connect((state, props) => ({ form: `carousel_${props.carousel._id}` })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCarouselItem)

export default AdminCarouselItem
