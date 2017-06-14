import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { CardMedia, CardActions } from 'material-ui/Card'
import ImageEditor from './ImageEditor'

import renderFileInput from '../../modules/renderFileInput'

const styles = {
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto'
  },
  button: {
    margin: '0 0 0 8px',
    flex: '1 1 auto',
    height: 24
  }
}

class ImageForm extends Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    opacity: 1,
    image: null,
    width: null,
    height: null,
    editing: false,
    fileInputKey: 1
  }
  componentWillMount() {
    const { item, width, height } = this.props
    const { image, _id } = item
    this.setState({ image, width, height, fileInputKey: _id })
  }
  handleSave = () => {
    const { dispatch, handleUpdate, item, type } = this.props
    const image = this.editor.getImageScaledToCanvas().toDataURL(type, 1)
    const update = { type: 'UPDATE_IMAGE', image }
    dispatch(handleUpdate(item._id, update))
    this.setState({ editing: false, image, submitted: false })
    this.props.reset()
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity })
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate - 90 })
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate + 90 })
  }
  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value, 10)
    this.setState({ borderRadius })
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }
  handlePositionChange = position => {
    this.setState({ position })
  }
  handleUpload = (e) => {
    console.log('inside handleUpload')
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    console.log(file)
    if (file) {
      reader.onload = (e) => this.setState({ image: e.target.result, editing: true, fileInputKey: this.props.item._id })
      reader.readAsDataURL(file)
    }
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render () {
    const { dispatch, handleSubmit, handleUpdate, item } = this.props
    return (
      <form
        style={{ display: 'flex', flexFlow: 'column' }}
        onSubmit={handleSubmit(this.handleSave)}
      >
        {!this.state.editing ? null :
          <CardMedia style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            <div style={{ flex: '0 0 auto' }}>
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                opacity={parseFloat(this.state.opacity)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.borderRadius}
                onSave={this.handleSave}
                image={this.state.image}
                crossOrigin="anonymous"
              />
            </div>
            <div style={{ flex: '1 1 auto', padding: '0 16px 0 16px' }}>
              <div style={styles.controlContainer}>
                <label>Zoom:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="0"
                  max="3"
                  step="0.01"
                  defaultValue="1"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Opacity:</label>
                <input
                  name="opacity"
                  type="range"
                  onChange={this.handleOpacity}
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Border radius:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleBorderRadius}
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="0"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>X Position:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleXPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.x}
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Y Position:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleYPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.y}
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Rotate:</label>
                <RaisedButton onTouchTap={this.rotateLeft} style={styles.button}>Left</RaisedButton>
                <RaisedButton onTouchTap={this.rotateRight} style={styles.button}>Right</RaisedButton>
              </div>

              <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <TextField
                  hintText="Width"
                  floatingLabelText="Width"
                  type="number"
                  value={this.state.width}
                  style={{ flex: '1 1 auto' }}
                  onChange={(e) => this.setState({ width: parseInt(e.target.value) })}
                />
                <TextField
                  hintText="Height"
                  floatingLabelText="Height"
                  type="number"
                  value={this.state.height}
                  style={{ flex: '1 1 auto' }}
                  onChange={(e) => this.setState({ height: parseInt(e.target.value) })}
                />
              </div>

            </div>
          </CardMedia>
        }
        {this.state.editing ? null : !this.state.image ? null : <img src={this.state.image} alt="form" style={{ alignSelf: 'center', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}/>}
        <div style={{ display: 'flex', flexFlow: 'row rap'}}>
          <Field
            key={this.state.fileInputKey}
            label="Choose Image"
            component={renderFileInput}
            name="imageFile"
            onChange={this.handleUpload}
          />
          {this.state.editing ?
            <RaisedButton
              type="submit"
              label="Update"
              primary={true}
              style={{ flex: '1 1 auto', margin: '8px 8px 8px 0' }}
            /> : null
          }
          {!this.state.image ? null :
            <RaisedButton
              onTouchTap={() => {
                if (item.image) {
                  const update = { type: 'DELETE_IMAGE', image: item.image }
                  dispatch(handleUpdate(item._id, update))
                }
                this.setState({ image: null, editing: false, fileInputKey: 1 })
              }}
              type="button"
              label={this.state.editing ? "X" : "Remove Image"}
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: '8px 8px 8px 0' }}
            />
          }
        </div>
      </form>
    )
  }
}

ImageForm = compose(
  connect((state, props) => ({ form: `image_${props.item._id}` })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: [] }))(ImageForm)

export default ImageForm
