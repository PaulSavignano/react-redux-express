import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import titleContainer from '../../containers/titles/titleContainer'

const TitleItem = ({
  item: {
    color,
    flex,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    margin,
    padding,
    textAlign,
    textShadow,
    text,
    width
  }
}) => (
  <div
    style={{
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      margin,
      padding,
      textAlign,
      textShadow,
      width
    }}
  >
    {text}
  </div>
)

export default titleContainer(TitleItem)
