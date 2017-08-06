import React from 'react'
import { Card } from 'material-ui/Card'

import iframeContainer from '../../containers/iframes/iframeContainer'

const IframeItem = ({
  dispatch,
  item: {
    values: {
      border,
      flex,
      iframe,
      margin,
      width,
      zDepth
    }
  },
  isFetching,
}) => (
  <Card
    zDepth={zDepth}
    style={{ border, flex, margin, width, cursor: 'pointer' }}
  >
    <div style={{ position: 'relative', paddingBottom: '50%' }}>
      <iframe
        title="iframe"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        src={iframe} frameBorder="0" allowFullScreen
      >
      </iframe>
    </div>
  </Card>
)

export default iframeContainer(IframeItem)
