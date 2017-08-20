import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import cardContainer from '../../containers/cards/cardContainer'
import H1 from '../typography/H1'
import H2 from '../typography/H2'
import H3 from '../typography/H3'
import P from '../typography/P'
import loadImage from '../images/loadImage'
import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

const AdminCard = ({
  card: {
    values: {
      buttonColor,
      buttonBackground,
      elevation,
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
  cursor,
  dispatch,
  events,
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
      flex,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      margin,
      mediaAlign,
      mediaBorder,
      pText
    }
  } = item
  return (
    <Card
      {...events}
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ cursor, margin }}
      zDepth={elevation}
      id={_id}
      className="card"
    >
      {iframe &&
        <CardMedia>
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
        </CardMedia>
      }
      {image.src &&
        <CardMedia>
          <img src={image.src} alt="card"/>

        </CardMedia>
      }
      {h1Text || h2Text || h3Text || pText.length > 8 ?
        <CardText>
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
            renderHTML(pText)
          }
        </CardText>
      : null}
          {button1Text &&
            <CardActions
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
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
            </CardActions>
          }


      {editing &&
        <AdminCardEdit
          form={`article_${_id}`}
          item={item}
          initialValues={item.values}
        />
      }
    </Card>
  )
}

AdminCard.propTypes = {
  card: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(loadImage(AdminCard))
