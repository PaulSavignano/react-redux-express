import React from 'react'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

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

const PageHero = ({ header, image, title, text }) => {
  console.log(title)
  return (
    <Card>
      <CardHeader title={header} />
      <CardMedia>
        <img src={image} />
      </CardMedia>
      <CardTitle title={title} />
      <CardText>
        {text}
      </CardText>
    </Card>
  )
}

export default PageHero
