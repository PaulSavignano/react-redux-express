import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FontIcon from 'material-ui/FontIcon'

const Footer = ({ isFetching, brand, muiTheme }) => {
  const { primary1Color, primary2Color, primary3Color } = muiTheme.palette
  const { facebook, github, google, instagram, linkedin, twitter, yelp, youtube } = brand
  return (
    isFetching ? null :
    <footer style={{ display: 'flex', justifyContent: 'center', padding: '64px 32px', backgroundColor: primary2Color, borderBottom: `50px solid ${primary1Color}`, marginTop: 128 }}>
      { facebook ? <a href={facebook}><FontIcon className="fa fa-facebook-square" style={{ color: primary1Color }} /></a> : null }
      { github ? <a href={github}><FontIcon className="fa fa-github-square" style={{ color: primary1Color }} /></a> : null }
      { google ? <a href={google}><FontIcon className="fa fa-google-plus-square" style={{ color: primary1Color }} /></a> : null }
      { instagram ? <a href={instagram}><FontIcon className="fa fa-instagram" style={{ color: primary1Color }} /></a> : null }
      { linkedin ? <a href={linkedin}><FontIcon className="fa fa-linkedin-square" style={{ color: primary1Color }} /></a> : null }
      { twitter ? <a href={twitter}><FontIcon className="fa fa-twitter-square" style={{ color: primary1Color }} /></a> : null }
      { yelp ? <a href={yelp}><FontIcon className="fa fa-yelp" style={{ color: primary1Color }} /></a> : null }
      { youtube ? <a href={youtube}><FontIcon className="fa fa-youtube-play" style={{ color: primary1Color }} /></a> : null }
    </footer>
  )
}

const mapStateToProps = ({ brand }) => ({
  isFetching: brand.isFetching,
  brand: brand.values
})


export default compose(connect(mapStateToProps), muiThemeable())(Footer)
