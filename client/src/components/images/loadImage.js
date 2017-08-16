import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const loadImage = (ComposedComponent) => {
  class Container extends Component {
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
      const flex = item.values && item.values.flex &&  item.values.flex
      const width = item.values && item.values.width && item.values.width
      return (
        loading ? null : image ?
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
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
  return Container
}

export default loadImage
