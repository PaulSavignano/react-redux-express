import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import heroContainer from '../../containers/articles/heroContainer'
import H1 from '../typography/H1'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import P from '../typography/P'
import loadImage from '../images/loadImage'
import AdminHeroEdit from './AdminHeroEdit'
import { startEdit } from '../../actions/heros'

const AdminHero = ({
  hero: {
    values: {
      buttonColor,
      buttonBackground,
      mediaElevation,
      h1Color,
      h1TextShadow,
      h2Color,
      h2TextShadow,
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
  return (
    <Card
      zDepth={0}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ width: '100%', padding: 8 }}
      className="hero"
    >
      {image.src || iframe &&
        <CardMedia zDepth={mediaElevation} style={{ flex: mediaFlex, margin: 8 }}>
          {image.src &&
            <img src={image.src} alt="card"/>
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
        </CardMedia>
      }
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
      {pText && pText.length > 8 &&
        <CardText style={{ flex: `1 1 auto`, padding: 8 }}>
          {renderHTML(pText)}
        </CardText>
      }
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
        <AdminHeroEdit
          form={`hero_${_id}`}
          item={item}
          initialValues={item.values}
        />
      }
    </Card>
  )
}

AdminHero.propTypes = {
  hero: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default heroContainer(loadImage(AdminHero))
