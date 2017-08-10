import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import cardContainer from './cardContainer'
import loadImage from '../images/loadImage'

const CardItem = ({ cursor, dispatch, item, zDepth, events }) => {
  const { _id, image, values } = item
  const { iframe, iframeBorder, link, margin, text } = values
  const nav = !link ? null : link.indexOf("/") === 0 ? { onTouchTap: () => dispatch(push(link)) } : { onTouchTap: () => window.location = link }
  return (
    <Card
      {...events}
      {...nav}
      style={{ cursor, margin }}
      zDepth={zDepth}
      id={_id}
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

CardItem.propTypes = {
  cursor: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  zDepth: PropTypes.number.isRequired,
  events: PropTypes.object,
}

export default cardContainer(loadImage(CardItem))
