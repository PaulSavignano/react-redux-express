import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import './Footer.css'
import footerContainer from '../../containers/footer/footerContainer'
import loadImage from '../images/loadImage'

const Footer = ({
  business: {
    values: {
      name,
      license,
      phone,
      email,
      street,
      city,
      state,
      zip,
      facebook,
      github,
      google,
      instagram,
      linkedin,
      twitter,
      yelp,
      youtube
    }
  },
  item: {
    image,
    values: {
      backgroundColor,
      borderTop,
      borderBottom,
      color,
      margin,
    }
  },
  primary1Color
}) => (
  <footer style={{ backgroundColor, borderBottom, borderTop }}>
    <Paper style={{ backgroundColor, color }}>
      <div style={{ textAlign: 'center', paddingTop: 32 }}>
        <div className="social-media">
          { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" style={{ color: primary1Color }} /></a> }
          { github && <a href={github}><FontIcon className="fa fa-github-square" style={{ color: primary1Color }} /></a> }
          { google && <a href={google}><FontIcon className="fa fa-google-plus-square" style={{ color: primary1Color }} /></a> }
          { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" style={{ color: primary1Color }} /></a> }
          { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" style={{ color: primary1Color }} /></a> }
          { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" style={{ color: primary1Color }} /></a> }
          { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" style={{ color: primary1Color }} /></a> }
          { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" style={{ color: primary1Color }} /></a> }
        </div>
        <div>
          <Link to="/" style={{}}>{name ? name : 'Brand'} {new Date().getFullYear()}</Link>
          { license && <div>License # {license}</div>}
          { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a></div> }
          { email && <div>{email}</div> }
          { street && <div>{street}</div> }
          { city && <div>{city}, {state} {zip}</div> }
        </div>
      </div>
      {image && image.src ?
        <div style={{ overflow: 'hidden' }}>
          <img src={image.src} alt="" style={{ display: 'block', margin }}/>
        </div>
      :
      <div style={{ paddingBottom: 16 }}/>
      }
    </Paper>
  </footer>
)

Footer.propTypes = {
  business: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default footerContainer(loadImage(Footer))
