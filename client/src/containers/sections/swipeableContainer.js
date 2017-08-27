import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'


const swipeableContainer = (ComposedComponent) => {
  class SwipeableContainer extends Component {
    state = {
      backgroundImage: false,
      loadingBackground: true,
      loadingViewImages: true,
      qtyViewLoaded: 0
    }
    handleBackgroundImage = () => {
      const { image } = this.props.item
      if (image && image.src) {
        const img = new Image()
        const src = image.src
        img.onload = () => this.setState({ backgroundImage: true, loadingBackground: false })
        img.src = src
      } else {
        this.setState({ loadingBackground: false })
      }
    }
    handleViewImages = () => {
      const { items } = this.props.item
      let qty = 0
      items.forEach(({ image }) => {
        if (image && image.src) {
          qty +1
          const img = new Image()
          const src = image.src
          img.onload = () => {
            this.setState({
              qtyViewLoaded: this.state.qtyViewLoaded + 1
            })
          }
          img.src = src
        }
      })
      if (qty === this.state.qtyViewLoaded) {
        this.setState({ loadingViewImages: false })
      }
    }
    componentWillMount() {
      this.handleBackgroundImage()
      this.handleViewImages()
    }
    render() {
      const {
        loadingBackground,
        loadingViewImages
      } = this.state
      const {
        dispatch,
        item,
        autoplay
      } = this.props
      const props = {
        dispatch,
        item,
        autoplay
      }
      return (
        !loadingBackground && !loadingViewImages ?
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
          style={{ width: '100%' }}
        >
          <ComposedComponent {...props} />
        </CSSTransitionGroup>
          : null
      )
    }
  }
  const mapStateToProps = ({
    swipeables: { autoplay },
  }, {
    item
  }) => ({
    autoplay,
    item
  })
  SwipeableContainer.propTypes = {
    autoplay: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
  }
  return connect(mapStateToProps)(SwipeableContainer)
}

export default swipeableContainer
