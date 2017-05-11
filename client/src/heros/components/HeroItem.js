import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Card, CardMedia } from 'material-ui/Card'
import '../../index.css'

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


class HeroItem extends Component {
  state = {
    loading: true,
    image: ''
  }
  componentDidMount() {
    this.setState({ loading: true })
    const img = new Image;
    const src = this.props.hero.image
    img.src = src
    img.onload = (e) => {
      this.setState({ loading: false, image: src })
    }
  }
  render() {
    const { hero } = this.props
    return (
      this.state.loading ? null :
        <Card>
          <CSSTransitionGroup
            transitionName="image"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}
          >
            <CardMedia >
              <img src={this.state.image} alt="hero" />
              <div style={styles.title}>{hero.values.title}</div>
              <div style={styles.text}>{hero.values.text}</div>
            </CardMedia>
          </CSSTransitionGroup>
        </Card>
    )
  }
}

export default HeroItem
