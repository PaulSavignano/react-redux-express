import React from 'react'
import PropTypes from 'prop-types'

import H1 from '../typography/H1'
import H2 from '../typography/H2'
import H3 from '../typography/H3'

const Heading = ({
  h1Align,
  h2Align,
  h3Align,
  h1Color,
  h2Color,
  h3Color,
  h1Text,
  h2Text,
  h3Text,
  h1TextShadow,
  h2TextShadow,
  h3TextShadow
}) => (
  <div style={{ overflow: 'hidden' }}>
    {h1Text &&
      <H1 textAlign={h1Align} color={h1Color} textShadow={h1TextShadow}>
        {h1Text}
      </H1>
    }
    {h2Text &&
      <H2 textAlign={h2Align} color={h2Color} textShadow={h2TextShadow}>
        {h2Text}
      </H2>
    }
    {h3Text &&
      <H3 textAlign={h3Align} color={h3Color} textShadow={h3TextShadow}>
        {h3Text}
      </H3>
    }
  </div>
)

Heading.propTypes = {
  h1Align: PropTypes.string,
  h2Align: PropTypes.string,
  h3Align: PropTypes.string,
  h1Color: PropTypes.string,
  h2Color: PropTypes.string,
  h3Color: PropTypes.string,
  h1Text: PropTypes.string,
  h2Text: PropTypes.string,
  h3Text: PropTypes.string,
  h1TextShadow: PropTypes.string,
  h2TextShadow: PropTypes.string,
  h3TextShadow: PropTypes.string
}

export default Heading
