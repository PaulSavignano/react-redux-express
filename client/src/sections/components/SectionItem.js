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
    if (values) {
      const height = values.height ? values.height : null
      const backgroundImage = item.image ? `url(${item.image})` : null
      const backgroundAttachment =values.backgroundAttachment ?values.backgroundAttachment : null
      const backgroundColor = values.backgroundColor ? values.backgroundColor : null
      const margin = values.margin ? values.margin : null
      const padding = values.padding ? values.padding : null
      const color = values.color ? values.color : null
      const title = values.title ? values.title : null
      const text = values.text ? values.text : null
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
            {title ? <h1 style={{ color }}>{title}</h1> : null}
            {text ? <h2 style={{ color }}>{text}</h2> : null}
          </div>
          <Cards section={ item } />
        </div>
      )
    }
    return (
      <div>
        <Cards section={ item } />
      </div>
    )
  }
}

export default SectionItem
