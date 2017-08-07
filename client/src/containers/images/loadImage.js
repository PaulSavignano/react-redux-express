import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const loadImage = (ComposedComponent) => {
  class Container extends Component {
    state = {
      loading: true
    }
    componentWillMount() {
      const { image } = this.props.item
      if (image && image.src) {
        console.log(image)
        const img = new Image()
        const src = image.src
        img.onload = () => this.setState({ loading: false })
        img.src = src
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

export default loadImage
