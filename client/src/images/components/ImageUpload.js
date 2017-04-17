import React, { Component } from 'react'

const styles = {
  grid: {
width: '100%',
height: 'auto'
  }
}

class ImageUpload extends Component {
  state = { image: this.props.image }
  handleChange = (e) => {
    e.preventDefault()
    const MAX_WIDTH = this.props.width
    const MAX_HEIGHT = this.props.height
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.onload = () => {
        let width = image.width
        let height = image.height
        if (width > height && width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        } else if (height > MAX_HEIGHT){
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        this.setState({ image: canvas.toDataURL('image/jpg') })
      }
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div style={styles.grid}>
        <canvas ref="canvas" name={this.props._id} style={{ display: 'none' }}/>
        <img src={this.state.image} ref="image" alt="" style={{ width: '100%', height: 'auto' }}/>
        <input type="file" onChange={ this.handleChange } />
      </div>
    )
  }
}

export default ImageUpload
