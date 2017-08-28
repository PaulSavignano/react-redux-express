import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import RaisedButton from 'material-ui/RaisedButton'

class Buttons extends Component {
  handleNavType = (buttonLink) => {
    const { dispatch } = this.props
    if (buttonLink.indexOf("/") === 0) {
      return dispatch(push(buttonLink))
    } else {
      return window.location = buttonLink
    }
  }
  handleButton1 = () => this.handleNavType(this.props.button1Link)
  handleButton2 = () => this.handleNavType(this.props.button2Link)
  render() {
    const {
      button1BackgroundColor,
      button2BackgroundColor,
      button1Color,
      button2Color,
      button1Link,
      button2Link,
      button1Text,
      button2Text,
    } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          margin: 8,
          overflow: 'hidden'
        }}
      >
        <RaisedButton
          backgroundColor={button1BackgroundColor}
          label={button1Text}
          labelColor={button1Color}
          onTouchTap={this.handleButton1}
          style={{ margin: 8 }}
        />
        {button2Text &&
          <RaisedButton
            backgroundColor={button2BackgroundColor}
            label={button2Text}
            labelColor={button2Color}
            onTouchTap={this.handleButton2}
            style={{ margin: 8 }}
          />
        }
      </div>
    )
  }
}

Buttons.propTypes = {
  button1BackgroundColor: PropTypes.string,
  button2BackgroundColor: PropTypes.string,
  button1Color: PropTypes.string,
  button2Color: PropTypes.string,
  button1Link: PropTypes.string,
  button2Link: PropTypes.string,
  button1Text: PropTypes.string.isRequired,
  button2Text: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

export default Buttons
