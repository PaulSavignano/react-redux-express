import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

import { fetchUpdate, fetchDelete } from '../actions/index'
import renderTextField from '../../modules/renderTextField'
import renderSelectField from '../../modules/renderSelectField'
import ImageForm from '../../images/components/ImageForm'


class AdminFooter extends Component {
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
  editing = (bool) => {
    console.log(bool)
    this.setState({ editing: bool, submitted: false })
  }
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, _id, item, imageSpec } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardTitle title="Footer" />
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
          const path = `footer/${_id}`
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
            <Field
              name="imageAlign"
              component={renderSelectField}
              label="imageAlign"
              style={{ margin: 4, flex: '1 1 auto' }}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="right" primaryText="right" />
            </Field>
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated Footer" : "Update Footer"}
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

AdminFooter = reduxForm({
  form: 'footer'
})(AdminFooter)

const mapStateToProps = (state, { item: { values } }) => ({
  initialValues: {
    ...values
  }
})

AdminFooter = connect(mapStateToProps)(AdminFooter)

export default AdminFooter
