import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ImageEditor from './ImageEditor'

const styles = {
  container: {
    padding: 8
  },
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap'
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
    preview: null,
    editing: true
  }

  handleSave = (data) => {
    console.log('saving')
    const img = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5)
    this.setState({
      editing: false,
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
  }

  handleEdit = () => {
    console.log('handling edit')
    this.setState({ editing: true })
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
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
    console.log('Position set to', position)
    this.setState({ position })
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  render () {
    return (
    this.state.editing === true ?
      <div>
        <ImageEditor
          ref={this.setEditorRef}
          scale={parseFloat(this.state.scale)}
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

        </div>

      </div> :
      <div>
        <img
          src={this.state.preview.img}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    )
  }
}


export default ImageForm
