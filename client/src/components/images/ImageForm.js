import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

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
    rotate: 0,
    borderRadius: 0,
    opacity: 1,
    editing: false,
    src: null,
    width: null,
    height: null,
    gradientY0: 0,
    gradientY1: 0,
    loading: false
  }
  componentWillMount() {
    const { image } = this.props
    if (image && image.src) {
      this.setState({ src: image.src, width: image.width, height: image.height })
    } else if (image && image.width && image.height){
      this.setState({ width: image.width, height: image.height })
    } else {
      return
    }
  }
  handleSave = () => {
    const { type } = this.props
    const image = {
      src: this.editor.getImageScaledToCanvas().toDataURL(type, 1),
      width: this.state.width,
      height: this.state.height
    }
    this.setState({ editing: false, src: image.src, submitted: false })
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
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file) {
      this.setState({ loading: true })
      reader.onload = (e) => {
        this.setState({
          ...this.state,
          src: e.target.result,
          editing: true,
          loading: false
        })
        this.props.onImageEdit(true)
      }
      reader.readAsDataURL(file)
    }
  }
  setEditorRef = (editor) => this.editor = editor
  render () {
    const { loading } = this.state
    const { _id, onImageDelete, style } = this.props
    const styles = style || {}
    const fontFamily = styles.fontFamily || null
    const backgroundColor = styles.backgroundColor || null
    const color = styles.color || null
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {this.state.editing &&
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', margin: 4 }}>
            <div style={{ margin: 4 }}>
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
                image={this.state.src}
                gradientY0={this.state.gradientY0}
                gradientY1={this.state.gradientY1}
                crossOrigin="anonymous"
              />
            </div>

            <div style={{ flex: '1 1 auto' }}>
              <div style={formStyles.controlContainer}>
                <label>Zoom:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="0"
                  max="3"
                  step="0.01"
                  defaultValue="1"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Opacity:</label>
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
                <label>Gradient Y0:</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY0}
                  min="0"
                  max="1000"
                  step="1"
                  value={this.state.gradientY0}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Gradient Y1:</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY1}
                  min="0"
                  max="1000"
                  step="1"
                  value={this.state.gradientY1}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Border radius:</label>
                <input
                  name="scale"
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
                <TextField
                  hintText="Width"
                  floatingLabelText="Width"
                  type="number"
                  value={this.state.width}
                  style={{ flex: '1 1 auto', margin: '0 8px' }}
                  onChange={(e) => this.setState({ width: parseInt(e.target.value, 10) })}
                />
                <TextField
                  hintText="Height"
                  floatingLabelText="Height"
                  type="number"
                  value={this.state.height}
                  style={{ flex: '1 1 auto', margin: '0 8px' }}
                  onChange={(e) => this.setState({ height: parseInt(e.target.value, 10) })}
                />
              </div>

            </div>
          </div>
        }
        {!this.state.editing && this.state.src && <img src={this.state.src} alt="form" style={{ alignSelf: 'center', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}/>}
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 4 }}>
          <RaisedButton
            label={loading ? <CircularProgress color={color} size={24} style={{ verticalAlign: 'middle' }} /> : `Choose ${this.state.width} x ${this.state.height} image`}
            labelPosition="before"
            containerElement="label"
            style={{ flex: '1 1 auto', margin: 4 }}
            buttonStyle={{ fontFamily, backgroundColor }}
            primary={styles.backgroundColor ? true : false}
          >
            <input
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0 }}
              onChange={this.handleUpload}
              type="file"
            />
          </RaisedButton>
          {this.state.src &&
            <RaisedButton
              onTouchTap={() => {
                this.setState({
                  ...this.state,
                  src: null,
                  editing: false
                })
                return onImageDelete(_id, { type: 'DELETE_IMAGE'})
              }}
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


export default ImageForm
