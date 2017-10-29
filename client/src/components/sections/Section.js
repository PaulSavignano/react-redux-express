import React from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

const Section = ({
  item: {
    _id,
    items,
    values: {
      pageLink
    }
  },
  propsForChild,
  propsForParent
}) => {
  return (
    <div {...propsForParent}>
      <section
        id={pageLink || _id}
        {...propsForChild}
        className="Section"
      >
        {items.map(component => {
          return (
            <ComponentSwitch
              component={component}
              key={component.item._id}
            />
          )
        })}
      </section>
    </div>
  )
}

Section.propTypes = {
  item: PropTypes.object.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(Section)
