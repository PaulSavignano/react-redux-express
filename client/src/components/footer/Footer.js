import React from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import footerContainer from '../../containers/footer/footerContainer'
import loadImage from '../../containers/images/loadImage'

const Footer = ({
  business: {
    name,
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
  },
  item: {
    image,
    styles: {
      backgroundColor,
      borderTop,
      borderBottom,
      color,
      margin,
    }
  }
}) => (
  <footer style={{ backgroundColor, borderBottom, borderTop }}>
    <Paper style={{ backgroundColor, color }}>
      <div style={{ textAlign: 'center', paddingTop: 32 }}>
        <div className="social-media">
          { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" style={{ color }} /></a> }
          { github && <a href={github}><FontIcon className="fa fa-github-square" style={{ color }} /></a> }
          { google && <a href={google}><FontIcon className="fa fa-google-plus-square" style={{ color }} /></a> }
          { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" style={{ color }} /></a> }
          { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" style={{ color }} /></a> }
          { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" style={{ color }} /></a> }
          { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" style={{ color }} /></a> }
          { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" style={{ color }} /></a> }
        </div>
        <div>
          <Link to="/" style={{}}>{name ? name : 'Brand'} {new Date().getFullYear()}</Link>
          { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a></div> }
          { email && <div>{email}</div> }
          { street && <div>{street}</div> }
          { city && <div>{city}, {state}. {zip}</div> }
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

export default footerContainer(loadImage(Footer))
