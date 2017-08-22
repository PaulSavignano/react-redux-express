import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import cardContainer from '../../containers/cards/cardContainer'
import Buttons from '../buttons/Buttons'
import Heading from '../headings/Heading'
import Media from '../media/Media'
import P from '../typography/P'
import loadImage from '../images/loadImage'
import AdminCardEdit from './AdminCardEdit'
import { startEdit } from '../../actions/cards'

class AdminCard extends Component {
  handleStartEdit = () => this.props.dispatch(startEdit(this.props.item))
  render() {
    const {
      card: {
        values: {
          button1Color,
          button1Background,
          button2Color,
          button2Background,
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
    } = this.props
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
        onTouchTap={this.handleStartEdit}
        style={{ cursor, margin }}
        zDepth={elevation}
        id={_id}
        className="card"
      >
        {hasHeading &&
          <Heading
            h1Align={h1Align}
            h2Align={h2Align}
            h3Align={h3Align}
            h1Color={h1Color}
            h2Color={h2Color}
            h3Color={h3Color}
            h1Text={h1Text}
            h2Text={h2Text}
            h3Text={h3Text}
            h1TextShadow={h1TextShadow}
            h2TextShadow={h2TextShadow}
            h3TextShadow={h3TextShadow}
          />
        }
        {hasParagraph && mediaAlign === 'right' ? <P>{renderHTML(pText)}</P> : null}
        {hasMedia &&
          <Media
            image={image}
            iframe={iframe}
          />
        }
        {hasParagraph && mediaAlign === 'left' ? <P>{renderHTML(pText)}</P> : null}
        {hasButtons &&
          <Buttons
            button1Background={button1Background}
            button2Background={button2Background}
            button1Color={button1Color}
            button2Color={button2Color}
            button1Link={button1Link}
            button2Link={button2Link}
            button1Text={button1Text}
            button2Text={button2Text}
          />
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
}

AdminCard.propTypes = {
  card: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(loadImage(AdminCard))
