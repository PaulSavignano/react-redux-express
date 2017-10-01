import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import './typography.css'
import P from './P'


const Paragraph = ({
  className,
  color,
  text,
}) => (
  <div id="Paragraph" className={className}>
    <P color={color}>{renderHTML(text)}</P>
  </div>
)

Paragraph.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
}

export default Paragraph
