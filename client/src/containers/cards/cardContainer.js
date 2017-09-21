import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import history from '../routers/history'

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
      const { item: { values: { link }}} = this.props
      return history.push(link)
    }
    render() {
      const { elevation } = this.state
      const {
        cardStyle,
        dispatch,
        hasButtons,
        hasText,
        hasMedia,
        hasParagraph,
        isFetching,
        item,
        typography
      } = this.props
      const { link } = item.values
      const cursor = link && 'pointer'
      const linkEvents = link && {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }
      const linkNavigation = link && {
        onTouchTap: this.handleNavigation
      }
      const props = {
        cardStyle,
        cursor,
        dispatch,
        elevation,
        linkEvents,
        linkNavigation,
        hasButtons,
        hasText,
        hasMedia,
        hasParagraph,
        item,
        typography,
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
    hasText: item.values.h1Text || item.values.h2Text || item.values.h3Text || item.values.pText.length > 9 ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    isFetching,
    item,
    typography
  })
  CardContainer.propTypes = {
    cardStyle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    hasText: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(CardContainer)
}

export default cardContainer
