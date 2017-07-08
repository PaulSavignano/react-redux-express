import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class HeaderBrand extends Component {
  state = {
    image: null
  }
  componentWillMount() {
    const { image } = this.props
    if (image) this.setState({ image: image.src })
  }
  componentWillReceiveProps({ image }) {
    if (image) {
      const newSrc = `${image.src}?${new Date().getTime()}`
      return this.setState({ image: newSrc })
    }
    this.setState({ image: null, hasImage: false })
  }
  render() {
    const { dispatch, name, fontFamily, color } = this.props
    const { image } = this.state
    return (
      <div
        style={{ cursor: 'pointer', height: '100%', maxHeight: 64 }}
        onTouchTap={() => dispatch(push('/'))}
      >
        {image ?
          <img src={image} style={{ width: 'auto', height: 64 }} alt="" />
        :
        <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontFamily, color }}>{name}</div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ brand: { appBar: { image, styles }, business }}) => {
  const fontFamily = styles && styles.brandFontFamily
  const color = styles ? styles.brandColor : '#ffffff'
  const name = business.name || 'Brand'
  return {
    image,
    name,
    fontFamily,
    color
  }
}

export default connect(mapStateToProps)(HeaderBrand)
