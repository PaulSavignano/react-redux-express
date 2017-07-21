import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import AdminSlideEdit from './AdminSlideEdit'
import { startEdit } from '../../actions/slides'

class AdminSlideList extends Component {
  state = {
    index: 0,
    intervalId: null,
    editItem: null,
    play: true,
    rtBtnColor: 'rgba(0, 0, 0, .1)',
    ltBtnColor: 'rgba(0, 0, 0, .1)'
  }
  componentWillMount() {
    const { editItem } = this.props
    if (editItem) {
      this.stop()
      this.setState({ editItem })
    }
    if (!this.state.intervalId && !editItem) {
      this.start()
      this.setState({ editItem: null })
    }
  }
  componentWillReceiveProps({ editItem }) {
    if (editItem) {
      this.stop()
      this.setState({ editItem })
    }
    if (!this.state.intervalId && !editItem) {
      this.start()
      this.setState({ editItem: null })
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  handleNext = () => {
    this.stop()
    const nextIndex = this.state.index + 1 < this.props.items.length  ? this.state.index + 1 : 0
    this.setState({ index: nextIndex })
    this.start()
  }
  handlePrev = () => {
    this.stop()
    const prevIndex = this.state.index > 0 ? this.state.index - 1 : this.props.items.length - 1
    this.setState({ index: prevIndex })
    this.start()
  }
  start = () => {
    const intervalId = setInterval(() => {
      if (this.state.index < this.props.items.length - 1) return this.setState({ index: this.state.index + 1 })
      this.setState({ index: 0 })
    }, 3000)
    this.setState({ intervalId, play: true })
  }
  stop = () => {
    clearInterval(this.state.intervalId)
    this.setState({ intervalId: null, play: false })
  }
  handleSelect = (index) => {
    this.stop()
    this.setState({ index })
    this.start()
  }
  handleEdit = (_id) => {
    this.stop()
    this.props.dispatch(startEdit(_id))
  }
  renderIndicators = (items) => items.map((item, index) => (
    <div
      key={item._id}
      style={{ border: '1px solid rgba(0, 0, 0, .5)', borderRadius: 16, height: 8, width: 8, backgroundColor: index === this.state.index ? this.props.canvasColor : '', cursor: 'pointer' }}
      onTouchTap={() => this.handleSelect(index)}
    />
  ))
  renderItem = (item) => {
    const { src, width } = item.image
    const values = item.values || {}
    const { text } = values
    return (
      <div onTouchTap={() => this.handleEdit(item._id)} key={item._id} style={{ cursor: 'pointer', height: '100%' }}>
        <Card
          zDepth={0}
          style={{ margin: '0 auto', backgroundColor: 'none' }}
          containerStyle={{ paddingBottom: 0 }}
        >
          {src && <CardMedia><img src={src} alt="slide"/></CardMedia>}
          {text && text.length > 8 && <CardText>{renderHTML(text)}</CardText>}
        </Card>
      </div>
    )
  }
  render() {
    const { rtBtnColor, ltBtnColor } = this.state
    const { isFetching, items } = this.props
    const styles = {
      button: {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        fontSize: 24,
        cursor: 'pointer'
      },
      rtButton: {
        color: rtBtnColor
      },
      ltButton: {
        color: ltBtnColor
      }
    }
    return (
      !isFetching &&
      <div style={{ width: '100%', padding: '24px 0 0' }}>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
          <button
            style={{ ...styles.button, ...styles.ltButton, }}
            onTouchTap={this.handlePrev}
            onMouseOver={() => this.setState({ ltBtnColor: 'rgba(0, 0, 0, .5)'})}
            onMouseLeave={() => this.setState({ ltBtnColor: 'rgba(0, 0, 0, .1)'})}
          >
            ◀︎
          </button>
          <CSSTransitionGroup
            transitionName="slide"
            transitionAppear={false}
            transitionEnter={true}
            transitionLeave={false}
            transitionEnterTimeout={600}
            style={{ height: 300}}
          >
            {this.renderItem(this.props.items[this.state.index])}
          </CSSTransitionGroup>
          <button
            style={{ ...styles.button, ...styles.rtButton }}
            onTouchTap={this.handleNext}
            onMouseOver={() => this.setState({ rtBtnColor: 'rgba(0, 0, 0, .5)'})}
            onMouseLeave={() => this.setState({ rtBtnColor: 'rgba(0, 0, 0, .1)'})}
          >
            ▶︎
          </button>
        </div>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', width: items[0].image.width, margin: '0 auto', padding: '24px 0' }}>
          {this.renderIndicators(items)}
        </div>
        {this.state.editItem && <AdminSlideEdit item={this.state.editItem} />}
      </div>
    )
  }
}


const mapStateToProps = ({ brand: { theme: { palette: { canvasColor }}}, slides: { isFetching, items }}, { slides }) => {
  const slideItems = slides.map(slide => items.find(item => item._id === slide.componentId))
  return {
    canvasColor,
    isFetching,
    items: slideItems,
    editItem: items.find(item => item.editing === true) || false
  }
}

export default connect(mapStateToProps)(AdminSlideList)
