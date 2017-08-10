import React from 'react'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'

import textContainer from '../../containers/texts/textContainer'

const TextItem = ({
  item: {
    _id,
    values: {
      flex,
      margin,
      padding,
      text,
      width
    }
  }
}) => (
  <Paper zDepth={0} style={{ flex, margin, width }} id={_id}>
    <div style={{ padding }}>{renderHTML(text)}</div>
  </Paper>
)

export default textContainer(TextItem)
