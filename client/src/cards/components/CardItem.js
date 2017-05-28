import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class CardItem extends Component {
  state = {
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.card.image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = this.props.card.image
      img.src = src
      img.onload = (e) => {
        this.setState({ loading: false, image: src })
      }
    } else {
      this.setState({ loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, card } = this.props
    const { image, values } = card
    let width, maxWidth, margin, backgroundColor, color, link, header, iFrame, title, text
    if (values) {
      width = values.width || null
      maxWidth = values.maxWidth || null
      margin = values.margin || null
      backgroundColor = values.backgroundColor || null
      color = values.color || null
      link = values.link || null
      header = values.header || null
      iFrame = values.iFrame || null
      title = values.title || null
      text = values.text || null
    }

    return (
      this.state.loading ? null :
      link ?
      <Card
        onTouchTap={() => dispatch(push(`${link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
        style={{ width, backgroundColor, maxWidth, margin, cursor: 'pointer' }}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          {header ? <CardHeader title={header} style={{ color }} /> : null }
          {image ? <CardMedia><img src={image} alt="card"/></CardMedia> : null }
          {iFrame ?
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <div>What people</div>
              <iframe
                title="google youtube"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iFrame} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          : null}
          {!title ? null : text ? <CardTitle title={title} style={{ color }}/> : <CardTitle title={title} titleStyle={{ textAlign: 'center', color }} /> }
          {text ? <CardText style={{ color }}>{text}</CardText> : null }
        </CSSTransitionGroup>
      </Card>
      :
      <Card
        className="cards"
        style={{ width, color, backgroundColor, maxWidth, margin }}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          {header ? <CardHeader title={header} style={{ color }}/> : null }
          {image ? <CardMedia><img src={image} alt="card"/></CardMedia> : null }
          {iFrame ?
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <iframe
                title="google youtube"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={iFrame} frameBorder="0" allowFullScreen>
              </iframe></div>
          : null}
          {!title ? null : text ? <CardTitle title={title} style={{ color }}/> : <CardTitle title={title} titleStyle={{ textAlign: 'center', color }} /> }
          {text ? <CardText style={{ color }}>{text}</CardText> : null }
        </CSSTransitionGroup>
      </Card>
    )
  }
}

export default connect()(CardItem)
