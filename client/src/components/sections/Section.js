import React from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import renderComponents from './renderComponents'

const Section = ({
  item: {
    _id,
    items
  },
  propsForParent,
  propsForChild,
}) => {
  return (
    <section {...propsForParent}>
      <div {...propsForChild}>
        {renderComponents({ components: items })}
      </div>
    </section>
  )
}

Section.propTypes = {
  item: PropTypes.object.isRequired
}

export default sectionContainer(Section)
