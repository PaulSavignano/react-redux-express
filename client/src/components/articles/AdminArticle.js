import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import loadImage from '../images/loadImage'
import AdminArticleEdit from './AdminArticleEdit'
import { startEdit } from '../../actions/articles'

const Article = ({
  dispatch,
  item: {
    _id,
    editing,
    image,
    values: {
      title,
      text,
      textAlign,
      ImageFlex,
      flexFlow,
      navigation
    }
  }
}) => (
  <div id={_id}>
    <Card 
      zDepth={0}
      id={navigation}
      onTouchTap={() => dispatch(startEdit(_id))}
    >
      {title && <CardTitle title={title} />}
      {text && textAlign === 'left' && <CardText style={{ color }}>{text}</CardText>}
      {image.src && <CardMedia><img src={image.src} alt="card"/></CardMedia>}
      {text && textAlign === 'right' && <CardText style={{ color }}>{text}</CardText>}
    </Card>
    {editing && <AdminArticleEdit item={item} />}
  </div>
)

Article.propTypes = {
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(Article))
