import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class AppBarBrand extends Component {
  state = {
    image: null,
    hasImage: false
  }
  componentWillMount() {
    const { image } = this.props.brand
    if (image) this.setState({ image: image.src, hasImage: true })
  }
  componentWillReceiveProps(nextProps) {
    const { image } = nextProps.brand
    if (image) {
      const newSrc = nextProps.brand.image.src + '?' + new Date().getTime()
      this.setState({ image: newSrc, hasImage: true })
    } else {
      this.setState({ image: null, hasImage: false })
    }
  }
  render() {
    const { dispatch, brand } = this.props
    return (
      <div style={{ cursor: 'pointer', maxHeight: 64}} onTouchTap={() => dispatch(push('/'))}>
        {this.state.hasImage ?
          <img src={this.state.image} style={{ width: 'auto', height: 64 }} alt="" />
        : brand.business.name || 'Brand'}
      </div>
    )
  }
}

const mapStateToProps = ({ brand }) => ({
  brand
})

export default connect(mapStateToProps)(AppBarBrand)
