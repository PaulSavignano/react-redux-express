import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

const Footer = ({ isFetching, brand: { business, socialMedia }, muiTheme }) => {
  const { palette, footer } = muiTheme
  const { primary1Color, textColor } = palette
  const { name, phone, email, street, city, state, zip } = business
  const { facebook, github, google, instagram, linkedin, twitter, yelp, youtube } = socialMedia
  const backgroundColor = footer.color || primary1Color
  const color = footer.textColor || textColor
  return (
    isFetching ? null :
    <footer style={{  marginTop: 128 }}>
      <Paper style={{ backgroundColor, color }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
          { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" style={{ color: primary1Color }} /></a> }
          { github && <a href={github}><FontIcon className="fa fa-github-square" style={{ color: primary1Color }} /></a> }
          { google && <a href={google}><FontIcon className="fa fa-google-plus-square" style={{ color: primary1Color }} /></a> }
          { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" style={{ color: primary1Color }} /></a> }
          { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" style={{ color: primary1Color }} /></a> }
          { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" style={{ color: primary1Color }} /></a> }
          { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" style={{ color: primary1Color }} /></a> }
          { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" style={{ color: primary1Color }} /></a> }
        </div>
        <div style={{ padding: '0 0 32px 0' }}>
          <div>{name ? name : 'Brand'} {new Date().getFullYear()}</div>
          { phone && <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a> }
          { email && <div>{email}</div> }
          { street && <div>{street}</div> }
          { city && <div>{city}, {state}. {zip}</div> }
        </div>
      </Paper>
    </footer>
  )
}

const mapStateToProps = ({ brand }) => ({
  isFetching: brand.isFetching,
  brand
})


export default compose(connect(mapStateToProps), muiThemeable())(Footer)
