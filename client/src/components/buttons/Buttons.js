import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class Buttons extends Component {
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
          containerElement={<Link to={button1Link || '/'}/>}
          label={button1Text}
          labelColor={button1Color}
          onTouchTap={this.handleButton1}
          style={{ margin: 8 }}
        />
        {button2Text &&
          <RaisedButton
            backgroundColor={button2BackgroundColor}
            containerElement={<Link to={button2Link || '/'}/>}
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
