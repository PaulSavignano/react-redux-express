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
        hasHeading,
        hasMedia,
        hasParagraph,
        isFetching,
        item,
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
        hasHeading,
        hasMedia,
        hasParagraph,
        item,
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, cardStyle }
  }, {
    item: {
      image,
      values: {
        button1Text,
        h1Text,
        h2Text,
        h3Text,
        iframe,
        pText
      }
    }
  }) => ({
    cardStyle,
    hasButtons: button1Text ? true : false,
    hasHeading: h1Text || h2Text || h3Text ? true : false,
    hasMedia: image.src || iframe ? true : false,
    hasParagraph: pText.length > 9 ? true : false,
    isFetching,
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
  }
  return connect(mapStateToProps)(CardContainer)
}

export default cardContainer
