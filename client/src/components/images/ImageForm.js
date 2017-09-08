import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Checkbox from 'material-ui/Checkbox'

import ImageEditor from './ImageEditor'

const formStyles = {
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto',
    margin: 4
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
    resizeProportionally: true,
    rotate: 0,
    borderRadius: 0,
    opacity: 1,
    editing: false,
    src: null,
    width: null,
    maxWidth: null,
    height: null,
    maxHeight: null,
    gradientY0: 0,
    gradientY1: 0,
    loading: false
  }
  handleImage = (image) => {
    if (image && image.src) {
      this.setState({
        src: image.src,
        width: image.width,
        height: image.height,
        maxWidth: image.width,
        maxHeight: image.height
      })
    }
  }
  componentWillMount() {
    const { image } = this.props
    this.handleImage(image)
  }
  componentWillReceiveProps({ image }) {
    if (image.src && image.src !== this.props.image.src) {
      this.handleImage(image)
    }
  }
  handleSave = () => {
    const { width, height } = this.state
    const { type } = this.props
    const image = {
      src: this.editor.getImageScaledToCanvas().toDataURL(type, 1),
      width,
      height
    }
    this.setState({ editing: false, ...image, submitted: false })
    return image
  }
  handleGradientY0 = (e) => {
    const gradientY0 = parseFloat(e.target.value)
    this.setState({ gradientY0 })
  }
  handleGradientY1 = (e) => {
    const gradientY1 = parseFloat(e.target.value)
    this.setState({ gradientY1 })
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
  updateCheck = () => {
    this.setState((oldState) => {
      return {
        resizeProportionally: !oldState.resizeProportionally,
      }
    })
  }
  handleWidth = (e) => {
    const { height, width, resizeProportionally } = this.state
    const newWidth = parseInt(e.target.value, 10)
    if (resizeProportionally) {
      const ratio = newWidth / width
      const newHeight = height * ratio
      this.setState({
        width: newWidth,
        height: newHeight
      })
    }
    this.setState({
      width: newWidth
    })
  }
  handleHeight = (e) => {
    const { height, width, resizeProportionally } = this.state
    const newHeight = parseInt(e.target.value, 10)
    if (resizeProportionally) {
      const ratio = newHeight / height
      const newWidth = width * ratio
      this.setState({
        width: newWidth,
        height: newHeight
      })
    }
    this.setState({
      height: newHeight
    })
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file) {
      this.setState({ loading: true })
      reader.onload = (e) => {
        const img = new Image()
        const src = e.target.result
        img.src = e.target.result
        img.onload = () => {
          this.setState({
            src,
            width: img.width,
            height: img.height,
            editing: true,
            loading: false,
            maxWidth: img.width,
            maxHeight: img.height,
          })
        }
        img.src = src
        this.props.onImageEdit(true)
      }
      reader.readAsDataURL(file)
    }
  }
  handleImageRemove = () => {
    const { src } = this.state
    const { onImageRemove } = this.props
    const image = { src }
    this.setState({
      ...this.state,
      src: null,
      editing: false
    })
    return onImageRemove(image)
  }
  renderLabel = () => {
    const { width, height } = this.state
    const { label } = this.props
    if (width && height) {
      return `Choose ${Math.round(width)} x ${Math.round(height)} ${label}`
    }
    return `Choose ${label}`
  }
  setEditorRef = (editor) => this.editor = editor
  render () {
    const {
      borderRadius,
      editing,
      gradientY0,
      gradientY1,
      height,
      loading,
      opacity,
      position,
      rotate,
      scale,
      src,
      width,
      maxWidth,
      maxHeight
    } = this.state
    const {
      fontFamily,
      label,
    } = this.props
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {this.state.editing &&
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', margin: 4 }}>
            <div style={{ margin: 4 }}>
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(scale)}
                opacity={parseFloat(opacity)}
                width={width}
                height={height}
                position={position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(rotate)}
                borderRadius={borderRadius}
                onSave={this.handleSave}
                image={src}
                gradientY0={gradientY0}
                gradientY1={gradientY1}
                crossOrigin="anonymous"
              />
            </div>

            <div style={{ flex: '1 1 auto' }}>
              <div style={formStyles.controlContainer}>
                <label>Zoom: {scale}</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="0"
                  max="10"
                  step="0.1"
                  defaultValue="1"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Opacity: {opacity}</label>
                <input
                  name="opacity"
                  type="range"
                  onChange={this.handleOpacity}
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Gradient Y0: {gradientY0}</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY0}
                  min="0"
                  max="3000"
                  step="10"
                  value={gradientY0}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Gradient Y1: {gradientY1}</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY1}
                  min="0"
                  max="3000"
                  step="10"
                  value={gradientY1}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Border radius: {borderRadius}</label>
                <input
                  name="radius"
                  type="range"
                  onChange={this.handleBorderRadius}
                  min="0"
                  max="500"
                  step="1"
                  defaultValue="0"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Rotate:</label>
                <RaisedButton onTouchTap={this.rotateLeft} style={formStyles.button}>Left</RaisedButton>
                <RaisedButton onTouchTap={this.rotateRight} style={formStyles.button}>Right</RaisedButton>
              </div>

              <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <Checkbox
                  label="Resize Proportionally"
                  checked={this.state.resizeProportionally}
                  onCheck={this.updateCheck}
                  style={{ alignSelf: 'flex-end', width: 'auto' }}
                />
                <TextField
                  hintText="Width"
                  floatingLabelText="Width"
                  type="number"
                  max={maxWidth}
                  value={Math.round(width)}
                  style={{ flex: '1 1 auto', margin: '0 8px' }}
                  onChange={this.handleWidth}
                />
                <TextField
                  hintText="Height"
                  floatingLabelText="Height"
                  type="number"
                  max={maxHeight}
                  value={Math.round(height)}
                  style={{ flex: '1 1 auto', margin: '0 8px' }}
                  onChange={this.handleHeight}
                />
              </div>

            </div>
          </div>
        }
        {!editing && src && <img src={src} alt="form" style={{ alignSelf: 'center', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}/>}
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 4 }}>
          <RaisedButton
            label={loading ? <CircularProgress size={24} style={{ verticalAlign: 'middle' }} /> : this.renderLabel()}
            labelPosition="before"
            containerElement="label"
            style={{ flex: '1 1 auto', margin: 4, fontFamily }}
          >
            <input
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0 }}
              onChange={this.handleUpload}
              type="file"
            />
          </RaisedButton>
          {this.state.src &&
            <RaisedButton
              onTouchTap={this.handleImageRemove}
              type="button"
              label="Remove Image"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
            />
          }
        </div>
      </div>
    )
  }
}

ImageForm.propTypes = {
  fontFamily: PropTypes.object,
  image: PropTypes.object,
  onImageEdit: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired
}

export default ImageForm
