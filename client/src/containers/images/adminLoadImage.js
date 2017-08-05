import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const adminLoadImage = (ComposedComponent) => {
  class Container extends Component {
    state = {
      image: null,
      loading: true
    }
    componentWillMount() {
      const { image } = this.props.item
      if (image && image.src) {
        const img = new Image()
        const src = image.src
        img.onload = () => this.setState({ image: src, loading: false })
        img.src = src
      } else {
        this.setState({ loading: false })
      }
    }
    componentWillReceiveProps({ item: { image, updatedAt } }) {
      if (image.src && this.props.item.updatedAt !== updatedAt) {
        return this.setState({ image: `${image.src}?${updatedAt}` })
      }
      if (!image.src) return this.setState({ image: null })
    }
    render() {
      const { loading, image } = this.state
      return (
        !loading &&
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
        >
          <ComposedComponent {...this.props} image={image} />
        </CSSTransitionGroup>
      )
    }
  }
  return Container
}

export default adminLoadImage
