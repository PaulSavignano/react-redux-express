import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import './footer1.css'
import footerContainer from '../../containers/footer/footerContainer'
import Media from '../media/Media'

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
      imageBorderRadius,
      imageElevation,
      imageMargin,
    }
  },
  primary1Color
}) => (
  <footer style={{ backgroundColor, borderBottom, borderTop }}>
    <Paper className="footer-paper" style={{ backgroundColor, color }}>
      <div className="footer-social-media">
        { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" /></a> }
        { github && <a href={github}><FontIcon className="fa fa-github-square" /></a> }
        { google && <a href={google}><FontIcon className="fa fa-google-plus-square" /></a> }
        { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" /></a> }
        { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" /></a> }
        { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" /></a> }
        { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" /></a> }
        { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" /></a> }
      </div>
      <div className="footer-brand">
        <Link to="/">{name ? name : 'Brand'} {new Date().getFullYear()}</Link>
        { license && <div>License # {license}</div>}
        { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`}>{phone}</a></div> }
        { email && <div>{email}</div> }
        { street && <div>{street}</div> }
        { city && <div>{city}, {state} {zip}</div> }
      </div>
      {image && image.src ?
        <div className="footer-image">
          <Media
            image={image}
            borderRadius={imageBorderRadius}
            elevation={imageElevation}
            margin={imageMargin}
          />
        </div>
      : null
      }
    </Paper>
  </footer>
)

Footer.propTypes = {
  business: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default footerContainer(Footer)
