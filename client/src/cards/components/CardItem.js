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
    if (this.props.item.image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = this.props.item.image
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
    const { dispatch, item } = this.props
    const { image, values } = item
    const width = values.width || null
    const maxWidth = values.maxWidth || null
    const margin = values.margin || null
    const backgroundColor = values.backgroundColor || null
    const color = values.color || null
    return (
      this.state.loading ? null :
      values.link ?
      <Card
        onTouchTap={() => dispatch(push(`${values.link}`))}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ flex: '1 1 auto', width, backgroundColor, maxWidth, margin, cursor: 'pointer' }}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          {values.header ? <CardHeader title={values.header} style={{ color }} /> : null }
          {image ? <CardMedia><img src={image} alt="item"/></CardMedia> : null }
          {values.iFrame ?
            <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
              <div>What people</div>
              <iframe
                title="google youtube"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={values.iFrame} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          : null}
          {!values.title ? null : values.text ? <CardTitle title={values.title} style={{ color }}/> : <CardTitle title={values.title} titleStyle={{ textAlign: 'center', color }} /> }
          {values.text ? <CardText style={{ color }}>{values.text}</CardText> : null }
        </CSSTransitionGroup>
      </Card>
        :
        <Card
          style={{ flex: '1 1 auto',  width, color, maxWidth, margin }}
        >
          <CSSTransitionGroup
            transitionName="image"
            transitionAppear={true}
            transitionAppearTimeout={900}
            transitionEnter={false}
            transitionLeave={false}
          >
            {values.header ? <CardHeader title={values.header} style={{ color }}/> : null }
            {image ? <CardMedia><img src={image} alt="item"/></CardMedia> : null }
            {values.iFrame ?
              <div style={{ position: 'relative', paddingBottom: '50%', border: '20px solid white' }}>
                <iframe
                  title="google youtube"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={values.iFrame} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
            {!values.title ? null : values.text ? <CardTitle title={values.title} style={{ color }}/> : <CardTitle title={values.title} titleStyle={{ textAlign: 'center', color }} /> }
            {values.text ? <CardText style={{ color }}>{values.text}</CardText> : null }
          </CSSTransitionGroup>
        </Card>
    )
  }
}

export default connect()(CardItem)
