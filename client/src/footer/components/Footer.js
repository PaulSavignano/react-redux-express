import React from 'react'
import { Link } from 'react-router'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FontIcon from 'material-ui/FontIcon'

const Footer = ({ muiTheme }) => {
  const { primary1Color, primary3Color } = muiTheme.palette
  return (
    <footer style={{ display: 'flex', justifyContent: 'center', padding: '60px 30px', backgroundColor: primary3Color, borderBottom: `50px solid ${primary1Color}` }}>
      <Link to="https://github.com/"><FontIcon className="fa fa-github-square" style={{ color: primary1Color }} /></Link>
      <Link to="https://twitter.com/"><FontIcon className="fa fa-twitter-square" style={{ color: primary1Color }} /></Link>
      <Link to="https://plus.google.com/"><FontIcon className="fa fa-google-plus-square" style={{ color: primary1Color }} /></Link>
      <Link to="https://www.linkedin.com/"><FontIcon className="fa fa-linkedin-square" style={{ color: primary1Color }} /></Link>
      <Link to="https://www.youtube.com/"><FontIcon className="fa fa-youtube-play" style={{ color: primary1Color }} /></Link>
      <Link to="https://www.facebook.com/"><FontIcon className="fa fa-facebook-square" style={{ color: primary1Color }} /></Link>
      <Link to="https://www.instagram.com/?hl=en"><FontIcon className="fa fa-instagram" style={{ color: primary1Color }} /></Link>
    </footer>
  )
}

export default muiThemeable()(Footer)
