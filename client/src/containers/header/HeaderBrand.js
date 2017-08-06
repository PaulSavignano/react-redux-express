import React, { Component } from 'react'
import { connect } from 'react-redux'

class HeaderBrand extends Component {
  state = {
    image: null
  }
  componentWillMount() {
    const { image } = this.props
    if (image.src) this.setState({ image: image.src })
  }
  componentWillReceiveProps({ image, updatedAt }) {
    if (image && image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image || !image.src) return this.setState({ image: null })
  }
  render() {
    const { image } = this.state
    const {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      name,
      textShadow
    } = this.props
    const styles = { color, fontFamily, fontSize, fontWeight, letterSpacing, textShadow }
    return (
      <div
        style={{ height: '100%', maxHeight: 64, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}
      >
        { image && <img src={image} style={{ width: 'auto', height: 64, marginRight: 8 }} alt="" /> }
        { name && <div style={{ ...styles }}>{name}</div> }
      </div>
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: {
      image,
      values: { color, font, name, textShadow }
    },
    updatedAt
  }
}) => ({
  color,
  font,
  image,
  name,
  textShadow,
  updatedAt
})

export default connect(mapStateToProps)(HeaderBrand)
