import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import './typography.css'
import Heading from './Heading'
import P from './P'

const Text = (props) => (
  <div>
    <Heading {...props}/>
    {props.pText &&
      <div className="text">
        <P>{renderHTML(props.pText)}</P>
      </div>
    }
  </div>
)

Text.propTypes = {
  h1Align: PropTypes.string,
  h2Align: PropTypes.string,
  h3Align: PropTypes.string,
  h1Color: PropTypes.string,
  h2Color: PropTypes.string,
  h3Color: PropTypes.string,
  h1Text: PropTypes.string,
  h2Text: PropTypes.string,
  h3Text: PropTypes.string,
  pText: PropTypes.string,
  h1TextShadow: PropTypes.string,
  h2TextShadow: PropTypes.string,
  h3TextShadow: PropTypes.string
}

export default Text
