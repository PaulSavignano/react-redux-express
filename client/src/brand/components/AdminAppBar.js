import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'


class AdminAppBar extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded, dirty }) {
    if (submitSucceeded) this.setState({ submitted: true, editing: false })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, handleSubmit, _id, item, error, imageSpec } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardTitle title="AppBar" />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={item.image}
            _id={_id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
          style={{ flex: '1 1 auto' }}
        >
          <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 4 }}>
            <Field
              name="color"
              label="color"
              type="text"
              component={renderTextField}
              style={{ margin: 4, flex: '1 1 auto' }}
            />
            <Field
              name="textColor"
              label="textColor"
              type="text"
              component={renderTextField}
              style={{ margin: 4, flex: '1 1 auto' }}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated AppBar" : "Update AppBar"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              fullWidth={true}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

AdminAppBar = reduxForm({
  form: 'appBar'
})(AdminAppBar)

const mapStateToProps = ({ brand: { appBar: { values } }}) => ({
  initialValues: {
    ...values
  }
})

AdminAppBar = connect(mapStateToProps)(AdminAppBar)

export default AdminAppBar
