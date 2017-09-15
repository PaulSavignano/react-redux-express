import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

const loadImage = (ComposedComponent) => {
  class LoadImage extends Component {
    state = {
      image: false,
      loading: true
    }
    componentWillMount() {
      const { image } = this.props.item
      if (image && image.src) {
        const img = new Image()
        const src = image.src
        img.onload = () => this.setState({ image: true, loading: false })
        img.src = src
      } else {
        this.setState({ image: false, loading: false })
      }
    }
    render() {
      const { image, loading } = this.state
      const { item } = this.props
      const flex = item.values && item.values.flex ? item.values.flex : '1 1 auto'
      const width = item.values && item.values.width ? item.values.width : '100%'
      return (
        loading ? null : image ?
        <CSSTransitionGroup
          transitionName="fadein"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false}
          style={{ flex, width }}
        >
          <ComposedComponent {...this.props} />
        </CSSTransitionGroup>
        :
        <div style={{ flex, width }}>
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }
  return LoadImage
}

export default loadImage
