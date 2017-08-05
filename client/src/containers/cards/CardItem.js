import React from 'react'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import cardContainer from './cardContainer'
import loadImage from '../images/loadImage'

const CardItem = ({ dispatch, item, zDepth, events }) => {
  const { image, values } = item
  const { flex, iframe, iframeBorder, link, margin, text, width } = values
  const nav = link && link.indexOf("/") === 0 ? { onTouchTap: () => dispatch(push(link)) } : { href: link }
  return (
    <Card
      {...events}
      {...nav}
      style={{ flex, margin, width }}
      zDepth={zDepth}
    >
      {image && image.src && <CardMedia><img src={image.src} alt="card"/></CardMedia>}
      {iframe &&
        <div style={{ position: 'relative', paddingBottom: '50%', border: iframeBorder }}>
          <iframe
            title="iframe"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={iframe} frameBorder="0" allowFullScreen>
          </iframe>
        </div>
      }
      {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText> }
    </Card>
  )
}

export default cardContainer(loadImage(CardItem))