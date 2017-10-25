import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import './button.css'

class Buttons extends Component {
  render() {
    const {
      className,
      button1BackgroundColor,
      button2BackgroundColor,
      button1Border,
      button2Border,
      button1Color,
      button2Color,
      button1Link,
      button2Link,
      button1Text,
      button2Text,
    } = this.props
    return (
      <div className={className ? `Buttons ${className}` : 'Buttons'}>
        {button1Link.includes('http') ?
          <a href={button1Link}>
            <RaisedButton
              backgroundColor={button1BackgroundColor}
              label={button1Text}
              labelColor={button1Color}
              style={{ border: button1Border  }}
            />
          </a>
        :
        <RaisedButton
          backgroundColor={button1BackgroundColor}
          containerElement={<Link to={button1Link || '/'}/>}
          label={button1Text}
          labelColor={button1Color}
          style={{ border: button1Border  }}
        />
        }

        {!button2Text ? null : button2Link.includes('http') ?
          <a href={button2Link}>
            <RaisedButton
              backgroundColor={button2BackgroundColor}
              label={button2Text}
              labelColor={button2Color}
              style={{ border: button2Border }}
            />
          </a>
        :
        <RaisedButton
          backgroundColor={button2BackgroundColor}
          containerElement={<Link to={button2Link || '/'}/>}
          label={button2Text}
          labelColor={button2Color}
          style={{ border: button2Border }}
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
}

export default Buttons
