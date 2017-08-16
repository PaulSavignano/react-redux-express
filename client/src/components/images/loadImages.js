import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const loadImages = (ComposedComponent) => {
  class Container extends Component {
    state = {
      loading: true,
      images: []
    }
    componentWillMount() {
      const { items } = this.props
      const images = items.filter(item => item.image.src).map(item => item && { src: item.image.src, loaded: false })
      if (images.length) {
        this.setState({ images })
        images.forEach((image, i) => {
          const img = new Image()
          const src = image.src
          img.onload = () => {
            images[i].loaded = true
            this.setState({ images })
          }
          img.src = src
        })
        const loading = this.state.images.find(image => image.loaded === false) ? true : false
        this.setState({ loading })
      } else {
        this.setState({ loading: false })
      }
    }
    render() {
      const { loading } = this.state
      return (
        !loading &&
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
        >
          <ComposedComponent {...this.props} />
        </CSSTransitionGroup>
      )
    }
  }
  return Container
}

export default loadImages
