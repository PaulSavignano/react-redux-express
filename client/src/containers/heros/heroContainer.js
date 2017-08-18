import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const heroContainer = (ComposedComponent) => {
  const HeroContainer = ({
    hero,
    dispatch,
    isFetching,
    item,
    typography
  }) => {
    const props = {
      hero,
      dispatch,
      item,
      typography
    }
    return (
      isFetching ? null : <ComposedComponent {...props} />
    )
  }
  const mapStateToProps = ({
    heros,
    brand: { isFetching, hero, typography }
  }, {
    componentId
  }) => ({
    hero,
    isFetching: isFetching || heros.isFetching ? true : false,
    item: !heros.isFetching && heros.items.find(item => item._id === componentId)
  })
  HeroContainer.propTypes = {
    hero: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(HeroContainer)
}

export default heroContainer
