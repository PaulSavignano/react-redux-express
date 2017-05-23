import React, { Component } from 'react'
import renderHTML from 'react-render-html'

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
  createMarkup = (html) => {
    return {__html: html};
  }
  render() {
    const { item, theme } = this.props
    const { values } = item
    const { fontFamily } = theme
    if (values) {
      const height = values.height ? values.height : null
      const backgroundColor = values.backgroundColor ? values.backgroundColor : null
      const margin = values.margin ? values.margin : null
      const padding = values.padding ? values.padding : null
      const width = values.textWidth ? values.textWidth : null
      const textAlign = values.titleAlign ? values.titleAlign : null
      const color = values.color ? values.color : null
      const title = values.title ? values.title : null
      const text = values.text ? values.text : null
      const backgrounds = item.image ? {
        backgroundImage: `url(${item.image})`,
        backgroundAttachment: values.backgroundAttachment,
        backgroundPosition: 'center center',
        backgroundRepeat:  'no-repeat',
        backgroundSize:  'cover',
        zIndex: -1
      } : null
      return (
        <div style={{
          height,
          ...backgrounds,
          backgroundColor,
          overflow: 'hidden',
        }}>
          <div style={{
            margin,
            padding,
            maxWidth: width
          }}>
            {title ? <h1 style={{ color, textAlign, fontFamily }}>{title}</h1> : null}
            {text ? <div style={{ color, fontFamily }}>{renderHTML(text)}</div> : null}

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
