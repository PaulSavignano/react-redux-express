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
  imageButton: {
    margin: '12px 0'
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
    preview: null,
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5)
    this.setState({
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
    return img
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
    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
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
    reader.onload = (e) => this.editor.loadImage(e.target.result)
    reader.readAsDataURL(file)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
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
        />
        <br />
        <div style={styles.container}>
          <div style={styles.controlContainer}>
            <label>Zoom:</label>
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
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
            <RaisedButton onClick={this.rotateLeft} style={styles.button}>Left</RaisedButton>
            <RaisedButton onClick={this.rotateRight} style={styles.button}>Right</RaisedButton>
          </div>
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.imageButton}
            containerElement="label"
            fullWidth={true}
          >
            <input type="file" style={styles.imageInput} onChange={this.handleUpload} />
          </RaisedButton>
        </div>
      </div>
    )
  }
}


export default ImageForm
