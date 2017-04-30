import React from 'react'
import {Card, CardMedia } from 'material-ui/Card'

const styles = {
  title: {
    top: '40vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '6vw',
    height: '6vw',
    padding: '8px 0 8px 0'
  },
  text: {
    top: '50vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '3vw',
    height: 'auto',
  }
}

const PageHero = ({ image, values }) => {
  return (
    <Card>
      <CardMedia>
        <img src={image} alt="hero"/>
        <div style={styles.title}>{values.title}</div>
        <div style={styles.text}>{values.text}</div>
      </CardMedia>
    </Card>
  )
}

export default PageHero
