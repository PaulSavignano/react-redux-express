import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const cardContainer = (ComposedComponent) => {
  class CardContainer extends Component {
    state = {
      elevation: null
    }
    componentWillMount() {
      const { values } = this.props.cardStyle
      if (values.elevation) this.setState({ elevation: values.elevation })
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    handleNavigation = () => {
      const { dispatch, item: { values: { link }}} = this.props
      if (link.indexOf("/") === 0) {
        dispatch(push(link))
      } else {
        window.location = link
      }
    }
    render() {
      const { elevation } = this.state
      const {
        cardStyle,
        dispatch,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        isFetching,
        item,
        typography
      } = this.props
      const { link } = item.values
      const cursor = link && 'pointer'
      const events = link && {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onTouchTap: this.handleNavigation
      }
      const props = {
        cardStyle,
        dispatch,
        elevation,
        events,
        hasButtons,
        hasHeading,
        hasMedia,
        hasParagraph,
        item,
        cursor,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, cardStyle, typography }
  }, {
    item
  }) => ({
    cardStyle,
    hasButtons: item.values.button1Text ? true : false,
    hasHeading: item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    hasParagraph: item.values.pText && item.values.pText.length > 8 ? true : false,
    isFetching,
    item,
    typography
  })
  CardContainer.propTypes = {
    cardStyle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(CardContainer)
}

export default cardContainer
