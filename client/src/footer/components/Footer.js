import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

class Footer extends Component {
  state = {
    image: null,
    hasImage: false
  }
  componentWillMount() {
    const { image } = this.props.footer
    if (image) this.setState({ image: image.src, hasImage: true })
  }
  componentWillReceiveProps(nextProps) {
    const { image } = nextProps.footer
    if (image) {
      const newSrc = nextProps.footer.image.src + '?' + new Date().getTime()
      this.setState({ image: newSrc, hasImage: true })
    } else {
      this.setState({ image: null, hasImage: false })
    }
  }
  render() {
    const { isFetching, footer, business, muiTheme: { palette: primary1Color, textColor } } = this.props
    const {
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
    } = business
    const backgroundColor = footer.values.color || primary1Color
    const color = footer.values.textColor || textColor
    const backgrounds = footer.image ? {
      backgroundImage: `url(${footer.image.src})`,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: `center ${footer.values.imageAlign}`,
      backgroundRepeat:  'no-repeat',
      zIndex: -1
    } : null
    return (
      isFetching ? null :
      <footer style={{  marginTop: 128 }}>
        <Paper style={{ backgroundColor, color, ...backgrounds }}>
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
}

const mapStateToProps = ({ brand: { isFetching, footer, business } }) => ({
  isFetching,
  footer,
  business
})


export default compose(connect(mapStateToProps), muiThemeable())(Footer)
