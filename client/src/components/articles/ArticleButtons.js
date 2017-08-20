import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

const ArticleButtons = ({
  button1Background,
  button2Background,
  button1Color,
  button2Color,
  button1Link,
  button2Link,
  button1Text,
  button2Text,
  onButtonClick,
}) => (
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
      backgroundColor={button1Background}
      label={button1Text}
      labelColor={button1Color}
      onTouchTap={onButtonClick(button1Link)}
      style={{ margin: 8 }}
    />
    {button2Text &&
      <RaisedButton
        backgroundColor={button2Background}
        label={button2Text}
        labelColor={button2Color}
        onTouchTap={onButtonClick(button2Link)}
        style={{ margin: 8 }}
      />
    }
  </div>
)

ArticleButtons.propTypes = {
  button1Background: PropTypes.string,
  button2Background: PropTypes.string,
  button1Color: PropTypes.string,
  button2Color: PropTypes.string,
  button1Link: PropTypes.string,
  button2Link: PropTypes.string,
  button1Text: PropTypes.string,
  button2Text: PropTypes.string,
  onButtonClick: PropTypes.func,
}

export default ArticleButtons
