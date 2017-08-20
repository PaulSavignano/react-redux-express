import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import H1 from '../typography/H1'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import loadImage from '../images/loadImage'
import AdminArticleEdit from './AdminArticleEdit'
import { startEdit } from '../../actions/articles'

const AdminArticle = ({
  article: {
    values: {
      buttonColor,
      buttonBackground,
      mediaElevation,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow
    }
  },
  dispatch,
  item,
}) => {
  const {
    _id,
    editing,
    image,
    values: {
      button1Text,
      button1Link,
      button2Text,
      button2Link,
      flexFlow,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      mediaAlign,
      mediaBorder,
      mediaFlex,
      pText
    }
  } = item
  const hasMedia = image.src || iframe ? true : false
  const RenderMedia = () => (
    <Paper zDepth={mediaElevation} style={{ flex: mediaFlex, margin: 8 }}>
      {image.src &&
        <CardMedia>
          <img src={image.src} alt="card"/>
        </CardMedia>
      }
      {iframe &&
        <div style={{ position: 'relative', paddingBottom: '50%' }}>
          <iframe
            title="iframe"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={iframe}
            frameBorder="0"
            allowFullScreen
          >
          </iframe>
        </div>
      }
    </Paper>
  )
  return (
    <article
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ width: '100%', padding: 8, overflow: 'hidden' }}
      className="article"
    >
      {h1Text &&
        <H1 textAlign={h1Align} color={h1Color} textShadow={h1TextShadow}>
          {h1Text}
        </H1>
      }
      {h2Text &&
        <H2 textAlign={h2Align} color={h2Color} textShadow={h2TextShadow}>
          {h2Text}
        </H2>
      }
      {h3Text &&
        <H3 textAlign={h3Align} color={h3Color} textShadow={h3TextShadow}>
          {h3Text}
        </H3>
      }

      {pText || hasMedia ?
        <div style={{ display: 'flex', flexFlow}}>
          {hasMedia && mediaAlign === 'left' ?
            <RenderMedia/>
          : null}
          {pText && pText.length > 8 &&
            <CardText style={{ flex: `1 1 auto`, padding: 8 }}>
              {renderHTML(pText)}
            </CardText>
          }
          {hasMedia && mediaAlign === 'right' ?
            <RenderMedia/>
          : null}
        </div>
      : null}
      {button1Text &&
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            margin: 8
          }}
        >
          <RaisedButton
            backgroundColor={buttonBackground}
            label={button1Text}
            labelColor={buttonColor}
            style={{ margin: 8 }}
          />
          {button2Text &&
            <RaisedButton
              backgroundColor={buttonBackground}
              label={button2Text}
              labelColor={buttonColor}
              style={{ margin: 8 }}
            />
          }
        </div>
      }
      {editing &&
        <AdminArticleEdit
          form={`article_${_id}`}
          item={item}
          initialValues={item.values}
        />
      }
    </article>
  )
}

AdminArticle.propTypes = {
  article: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(AdminArticle))
