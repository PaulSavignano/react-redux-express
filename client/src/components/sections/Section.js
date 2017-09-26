import React from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import renderComponents from './renderComponents'

const Section = ({
  item: {
    _id,
    items,
    values: {
      Link
    }
  },
  style
}) => {
  return (
    <section style={style} className="Section">
      {renderComponents({ components: items })}
    </section>
  )
}

Section.propTypes = {
  item: PropTypes.object.isRequired
}

export default sectionContainer(Section)
