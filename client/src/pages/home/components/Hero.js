import React, { Component } from 'react'
import {Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const styles = {
  title: {
    top: '37vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '6vw',
    height: '6vw',
    padding: '8px 0 8px 0'
  },
  text: {
    top: '45.8vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '3vw',
    height: 'auto',
  }
}

const Hero = ({ contents }) => {
  console.log(contents)
  return (
    contents ?
    <Card>
      <CardMedia>
        <img src={contents.heroImage} />
        <div style={styles.title}>{contents.heroTitle}</div>
        <div style={styles.text}>{contents.heroText}</div>
      </CardMedia>
    </Card>
    : null
  )
}

export default Hero
