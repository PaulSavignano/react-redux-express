import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import loadImage from '../images/loadImage'
import AdminArticleEdit from './AdminArticleEdit'
import { startEdit } from '../../actions/articles'

const AdminArticle = ({
  article: {
    values: {
      elevation,
      titleAlign,
      titleColor,
      titleFontFamily,
      titleFontSize,
      titleFontWeight,
      titleLetterSpacing,
      titleTextShadow,
      subtitleColor,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleFontWeight,
      subtitleLetterSpacing,
      subtitleTextShadow
    }
  },
  dispatch,
  item
}) => {
  const {
    _id,
    editing,
    image,
    values: {
      imageAlign,
      imageFlex,
      flexFlow,
      text,
      title,
      subtitle
    }
  } = item
  const RenderCardText = () => (
    <CardText style={{ flex: `1 1 auto`, padding: 8 }}>
      {renderHTML(text)}
    </CardText>
  )
  return (
    <Card
      zDepth={0}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ width: '100%', padding: 8 }}
    >
      {title &&
        <CardTitle
          title={title}
          titleStyle={{
            color: titleColor,
            fontFamily: titleFontFamily,
            fontSize: titleFontSize,
            fontWeight: titleFontWeight,
            letterSpacing: titleLetterSpacing,
            textShadow: titleTextShadow
          }}
          subtitle={subtitle}
          subtitleStyle={{
            color: subtitleColor,
            fontFamily: subtitleFontFamily,
            fontSize: subtitleFontSize,
            fontWeight:subtitleFontWeight,
            letterSpacing: subtitleLetterSpacing,
            textShadow: subtitleTextShadow
          }}
          style={{ width: '100%', padding: 8 }}
        />}
      <div style={{ display: 'flex', flexFlow }}>
        {text && imageAlign === 'left' &&
          <RenderCardText />
        }
        {image.src &&
          <Paper zDepth={elevation} style={{ flex: imageFlex, margin: 8 }}>
            <CardMedia>
              <img src={image.src} alt="card"/>
            </CardMedia>
          </Paper>
        }
        {text && imageAlign === 'right' &&
          <RenderCardText />
        }
      </div>
      {editing && <AdminArticleEdit item={item} />}
    </Card>
  )
}

AdminArticle.propTypes = {
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(AdminArticle))
