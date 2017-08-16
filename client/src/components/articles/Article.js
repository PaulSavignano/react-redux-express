import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import loadImage from '../images/loadImage'

const Article = ({
  item: {
    _id,
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
    <Card zDepth={0} id={navigation}>
      {title && <CardTitle title={title} />}
      {text && textAlign === 'left' && <CardText>{text}</CardText>}
      {image.src && <CardMedia><img src={image.src} alt="article"/></CardMedia>}
      {text && textAlign === 'right' && <CardText>{text}</CardText>}
    </Card>
  </div>
)

Article.propTypes = {
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(Article))
