import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import H1 from '../typography/H1'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import P from '../typography/P'
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
      button1Content,
      button1Link,
      button2Content,
      button2Link,
      flexFlow,
      h1Content,
      h2Content,
      h3Content,
      iframe,
      mediaAlign,
      mediaBorder,
      mediaFlex,
      pContent
    }
  } = item
  const RenderP = () => (
    <CardText style={{ flex: `1 1 auto`, padding: 8 }}>
      {renderHTML(pContent)}
    </CardText>
  )
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
    <Card
      zDepth={0}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ width: '100%', padding: 8 }}
    >
      {h1Content &&
        <H1 textAlign={h1Align} color={h1Color} textShadow={h1TextShadow}>
          {h1Content}
        </H1>
      }
      {h2Content &&
        <H2 textAlign={h2Align} color={h2Color} textShadow={h2TextShadow}>
          {h2Content}
        </H2>
      }
      {h3Content &&
        <H3 textAlign={h3Align} color={h3Color} textShadow={h3TextShadow}>
          {h3Content}
        </H3>
      }
      {pContent && mediaAlign ==='left' &&
        <RenderMedia/>
      }
      {pContent &&
        <CardText style={{ flex: `1 1 auto`, padding: 8 }}>
          {renderHTML(pContent)}
        </CardText>
      }
      {pContent && mediaAlign ==='right' &&
        <RenderMedia/>
      }
      {button1Content &&
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-around',
            margin: 8
          }}
        >
          <RaisedButton
            backgroundColor={buttonBackground}
            label={button1Content}
            labelColor={buttonColor}
            style={{ margin: 8 }}
          />
          {button2Content &&
            <RaisedButton
              backgroundColor={buttonBackground}
              label={button2Content}
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
    </Card>
  )
}

AdminArticle.propTypes = {
  article: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(AdminArticle))
