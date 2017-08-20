import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const cardContainer = (ComposedComponent) => {
  class CardContainer extends Component {
    state = {
      elevation: null
    }
    componentWillMount() {
      const { values } = this.props.item
      if (values.elevation) this.setState({ elevation: values.elevation })
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    render() {
      const { elevation } = this.state
      const {
        card,
        dispatch,
        isFetching,
        item,
        typography
      } = this.props
      const { link } = item.values
      const cursor = link && 'pointer'
      const events = link && {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        card,
        dispatch,
        elevation,
        events,
        item,
        cursor,
        typography
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, card, typography },
    cards
  }, {
    componentId
  }) => ({
    card,
    item: cards.items.find(item => item._id === componentId),
    isFetching,
    typography
  })
  CardContainer.propTypes = {
    card: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(CardContainer)
}

export default cardContainer
