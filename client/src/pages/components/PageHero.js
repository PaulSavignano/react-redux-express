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

const PageHero = ({ contents }) => {
  console.log('PageHero', contents)
  return (
    contents ?
    <Card>
      <CardMedia>
        <img src={contents.image} />
        <div style={styles.title}>{contents.title}</div>
        <div style={styles.text}>{contents.text}</div>
      </CardMedia>
    </Card>
    : null
  )
}

export default PageHero
