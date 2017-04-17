import React from 'react'
import { Link } from 'react-router'
import FontIcon from 'material-ui/FontIcon'

const styles = {
  section: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    padding: '28px 36px'

  }
}

const Footer = () => (
  <footer>
    <section style={styles.section}>
      <a href="https://github.com/"><FontIcon className="fa fa-github-square" /></a>
      <a href="https://twitter.com/"><FontIcon className="fa fa-twitter-square"/></a>
      <a href="https://plus.google.com/"><FontIcon className="fa fa-google-plus-square"/></a>
      <a href="https://www.linkedin.com/"><FontIcon className="fa fa-linkedin-square"/></a>
      <a href="https://www.youtube.com/"><FontIcon className="fa fa-youtube-play"/></a>
      <a href="https://www.facebook.com/"><FontIcon className="fa fa-facebook-square"/></a>
      <a href="https://www.instagram.com/?hl=en"><FontIcon className="fa fa-instagram"/></a>
    </section>

  </footer>
)

export default Footer
