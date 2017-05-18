import React, { Component } from 'react'

import Cards from '../../cards/containers/Cards'

class SectionItem extends Component {
  state = {
    image: ''
  }
  componentDidMount() {
    if (this.props.item.image) {
      const img = new Image()
      const src = this.props.item.image
      img.src = src
      img.onload = (e) => {
        this.setState({ image: src })
      }
    }
  }
  render() {
    const { item } = this.props
    const { values } = item
    const height = values.height ? values.height : null
    const backgroundImage = item.image ? `url(${item.image})` : null
    const backgroundAttachment = values.backgroundAttachment ? values.backgroundAttachment : null
    const backgroundColor = values.backgroundColor ? values.backgroundColor : null
    const margin = values.margin ? values.margin : null
    const padding = values.padding ? values.padding : null
    const color = values.color ? values.color : null
    return (
      <div style={{
        height,
        backgroundImage,
        backgroundPosition: 'center center',
        backgroundRepeat:  'no-repeat',
        backgroundAttachment,
        backgroundSize:  'cover',
        backgroundColor,
        overflow: 'hidden',
      }}>
        <div style={{
          margin,
          padding,
          textAlign: 'center',
          maxWidth: 575
        }}>
          <h1 style={{ color }}>{item.values.title}</h1>
          <h2 style={{ color }}>{item.values.text}</h2>
        </div>
        <Cards section={ item } />
      </div>
    )
  }
}

export default SectionItem
