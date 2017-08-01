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
    const { image } = this.state
    const { color, font, name, textShadow } = this.props
    return (
      <div
        style={{ height: '100%', maxHeight: 64, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}
      >
        { image && <img src={image} style={{ width: 'auto', height: 64, marginRight: 8 }} alt="" /> }
        { name && <div style={{ color, font, textShadow }}>{name}</div> }
      </div>
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: {
      image,
      values: { color, font, name, textShadow }
    }
  }
}) => ({
  color,
  font,
  image,
  name,
  textShadow
})

export default connect(mapStateToProps)(HeaderBrand)
