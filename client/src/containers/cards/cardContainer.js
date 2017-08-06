import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const cardContainer = (ComposedComponent) => {
  class Container extends Component {
    state = {
      zDepth: null
    }
    componentWillMount() {
      const { values } = this.props.item
      if (values.zDepth) this.setState({ zDepth: values.zDepth })
    }
    handleMouseEnter = () => this.setState({ zDepth: 4 })
    handleMouseLeave = () => this.setState({ zDepth: 1 })
    render() {
      const { zDepth } = this.state
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const { link } = item.values
      const cursor = link && 'pointer'
      const events = link && {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        dispatch,
        item,
        zDepth,
        events,
        cursor
      }
      return (
        !isFetching && item && <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => ({
    item: items.find(item => item._id === componentId),
    isFetching,
  })
  Container.propTypes = {
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(Container)
}

export default cardContainer
