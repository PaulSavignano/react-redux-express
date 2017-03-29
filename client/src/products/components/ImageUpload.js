import React from 'react'

class ImageUpload extends React.Component {
  componentDidMount() {
    this.renderCanvas()
  }
  renderCanvas() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      const width = image.width
      const height= image.height
      canvas.width = width
      canvas.height = height
      ctx.drawImage(image, 0, 0, width, height)
    }
    image.src = this.props.image
  }
  handleChange = (e) => {
    e.preventDefault()
    const MAX_WIDTH = this.props.width
    const MAX_HEIGHT = this.props.height
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const file = e.target.files[0]
    const image = new Image()
    const reader = new FileReader()
    reader.onload = (e) => {
      image.src = e.target.result
      let width = image.width
      let height = image.height
      if (width > height && width > MAX_WIDTH) {
        height *= MAX_WIDTH / width
        width = MAX_WIDTH
      } else if (height > MAX_HEIGHT){
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(image, 0, 0, width, height)
    }
    reader.readAsDataURL(file)
  }
  render() {
    return (
      <div>
        <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
          <canvas ref="canvas" name={this.props._id} />
        </div>
        <div style={{ paddingLeft: 8 }}>
          <input type="file" onChange={ this.handleChange } />
        </div>
      </div>
    )
  }
}

export default ImageUpload
