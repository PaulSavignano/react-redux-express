import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { toggleDrawer } from '../../actions/drawer'

class HeaderBrand extends Component {
  state = {
    image: null
  }
  componentWillMount() {
    const { image } = this.props
    if (image.src) this.setState({ image: image.src })
  }
  componentWillReceiveProps({ image }) {
    if (image.src) return this.setState({ image: `${image.src}?${new Date().getTime()}` })
    this.setState({ image: null })
  }
  render() {
    const { dispatch, name, fontFamily, color } = this.props
    const { image } = this.state
    return (
      <div
        style={{ cursor: 'pointer', height: '100%', maxHeight: 64, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}
        onTouchTap={() => {
          dispatch(toggleDrawer())
          return dispatch(push('/'))
        }}
      >
        { image && <img src={image} style={{ width: 'auto', height: 64, marginRight: 8 }} alt="" /> }
        { name && <div style={{ fontFamily, color }}>{name}</div> }
      </div>
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: {
      image,
      values: { name, brandFontFamily, brandColor }
    }
  }
}) => ({
  image,
  name: name,
  fontFamily: brandFontFamily,
  color: brandColor
})

export default connect(mapStateToProps)(HeaderBrand)
