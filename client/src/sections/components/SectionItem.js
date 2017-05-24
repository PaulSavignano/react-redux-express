import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'

import Cards from '../../cards/containers/Cards'

class SectionItem extends Component {
  state = {
    image: null
  }
  componentWillMount() {
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
  renderWithValues = (item) => {
    const { values } = item
    const { fontFamily } = this.props.brand
    const height = values.height || null
    const backgroundColor = values.backgroundColor || null
    const margin = values.margin || null
    const padding = values.padding || null
    const width = values.textWidth || null
    const textAlign = values.titleAlign || null
    const color = values.color || null
    const title = values.title || null
    const text = values.text || null
    const backgrounds = item.image ? {
      backgroundImage: `url(${item.image})`,
      backgroundAttachment: values.backgroundAttachment,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    } : null
    return (
      !this.state.image ? null :
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
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
      </CSSTransitionGroup>
    )
  }
  render() {
    const { isFetching, item } = this.props
    return (
    isFetching ? null : item.values ? this.renderWithValues(item) :
    <div>
      <Cards section={ item } />
    </div>
    )
  }
}

export default SectionItem
