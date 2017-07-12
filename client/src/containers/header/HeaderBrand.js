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
    if (image) return this.setState({ image: `${image.src}?${new Date().getTime()}` })
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

const mapStateToProps = ({
  brand: {
    appBar: {
      image,
      styles: { brandFontFamily, brandColor }
    },
    business: { name }
  }
}) => ({
  image,
  name: name || 'Brand',
  fontFamily: brandFontFamily,
  color: brandColor
})

export default connect(mapStateToProps)(HeaderBrand)
