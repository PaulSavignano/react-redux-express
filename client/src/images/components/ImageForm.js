import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ImageEditor from './ImageEditor'

const styles = {
  container: {
    padding: '0 16px 0 16px'
  },
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto'
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
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
    opacity: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null
  }
  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL(this.props.type, 1)
    this.setState({
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
    this.props.editing(false)
    return img
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale }, () => this.handleEditing())
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity }, () => this.handleEditing())
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    }, () => this.handleEditing())
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    }, () => this.handleEditing())
  }
  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value, 10)
    this.setState({ borderRadius }, () => this.handleEditing())
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } }, () => this.handleEditing())
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } }, () => this.handleEditing())
  }
  handlePositionChange = position => {
    this.state.position.x || this.state.position.y === 0.5 ? this.props.editing(false) : this.props.editing(true)
    this.setState({ position }, () => this.handleEditing())
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file) {
      reader.onload = (e) => this.editor.loadImage(e.target.result)
      reader.readAsDataURL(file)
      this.props.editing(true)
    }
  }
  handleEditing = () => {
    const { position, scale, opacity, rotate, borderRadius } = this.state
    if (position.x === 0.5 && position.y === 0.5 && scale === 1 && opacity === 1 && rotate === 0 && borderRadius === 0) {
      this.props.editing(false)
    } else {
      this.props.editing(true)
    }
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  readImage = (url) => {
    return this.editor.readImage(url)
  }
  render () {
    return (
      <div>
        <ImageEditor
          ref={this.setEditorRef}
          scale={parseFloat(this.state.scale)}
          opacity={parseFloat(this.state.opacity)}
          width={this.props.width}
          height={this.props.height}
          position={this.state.position}
          onPositionChange={this.handlePositionChange}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave}
          image={this.props.image}
          crossOrigin="anonymous"
        />
        <br />
        <div style={styles.container}>
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            containerElement="label"
            style={{ margin: '0 0 8px 0'}}
            fullWidth={true}
          >
            <input type="file" style={styles.imageInput} onChange={this.handleUpload} />
          </RaisedButton>
          <div style={styles.controlContainer}>
            <label>Zoom:</label>
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="0"
              max="2"
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
        </div>
      </div>
    )
  }
}


export default ImageForm
