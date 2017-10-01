import React from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

const Section = ({
  containerProps,
  item: {
    _id,
    items,
    values: {
      pageLink
    }
  },
  sectionProps
}) => {
  return (
    <div {...containerProps}>
      <section
        id={pageLink || _id}
        {...sectionProps}
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
  containerProps: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  sectionProps: PropTypes.object.isRequired
}

export default sectionContainer(Section)
