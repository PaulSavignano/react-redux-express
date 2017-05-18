import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'

class CarouselItem extends Component {
  state = {
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
  render() {
    const { item } = this.props
    const { image, values } = item
    return (
      this.state.loading ? null :
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div style={{ margin: '0 auto 0 auto'}}>
          <div style={{ textAlign: 'center', fontSize: 24, padding: 16 }}>
            {values.text}
          </div>
          <img src={image} alt="card" style={{ padding: 16 }}/>
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default connect()(CarouselItem)
