import React from 'react'
import { Link } from 'react-router'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FontIcon from 'material-ui/FontIcon'

const Footer = (props) => (
  <footer style={{ display: 'flex', justifyContent: 'center', padding: '60px 30px', backgroundColor: props.muiTheme.palette.primary3Color }}>
    <Link to="https://github.com/"><FontIcon className="fa fa-github-square" /></Link>
    <Link to="https://twitter.com/"><FontIcon className="fa fa-twitter-square"/></Link>
    <Link to="https://plus.google.com/"><FontIcon className="fa fa-google-plus-square"/></Link>
    <Link to="https://www.linkedin.com/"><FontIcon className="fa fa-linkedin-square"/></Link>
    <Link to="https://www.youtube.com/"><FontIcon className="fa fa-youtube-play"/></Link>
    <Link to="https://www.facebook.com/"><FontIcon className="fa fa-facebook-square"/></Link>
    <Link to="https://www.instagram.com/?hl=en"><FontIcon className="fa fa-instagram"/></Link>
  </footer>
)

export default muiThemeable()(Footer)
