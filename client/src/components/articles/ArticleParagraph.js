import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import P from '../typography/P'

const ArticleParagraph = ({
  pText
}) => (
  <div style={{ margin: 16 }}>
    <P>{renderHTML(pText)}</P>
  </div>

)

export default ArticleParagraph
