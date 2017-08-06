import React from 'react'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import cardContainer from './cardContainer'
import adminLoadImage from '../images/adminLoadImage'
import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

const AdminCardItem = ({ dispatch, item, zDepth, events }) => {
  const { _id, editing, image, values } = item
  const { flex, iframe, iframeBorder, margin, text, width } = values
  return (
    <Card
      {...events}
      onTouchTap={() => dispatch(startEdit(_id))}
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
      {editing && <AdminCardEdit item={item} />}
    </Card>
  )
}

export default cardContainer(adminLoadImage(AdminCardItem))
