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
  renderFooter() {
    const { isFetching, footer: { image, values }, business, muiTheme: { palette }} = this.props
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
    const backgroundColor = values.color || palette.primary1Color
    const color = values.textColor || palette.textColor
    const borderBottom = values.borderBottom || null
    const backgrounds = image ? {
      backgroundImage: `url(${image.src})`,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: `center ${values.imageAlign}`,
      backgroundRepeat:  'no-repeat',
      zIndex: -1
    } : null
    return (
      isFetching ? null :
      <footer style={{ borderBottom }}>
        <Paper style={{ backgroundColor, color, ...backgrounds }}>
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
          <div style={{ paddingBottom: 16 }}>
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
  renderBlankFooter() {
    const { muiTheme: { palette: { primary1Color }}} = this.props
    return (
      <footer>
        <Paper style={{ backgroundColor: primary1Color, color: '#ffffff' }}>
          <div className="social-media">
            <a href=""><FontIcon className="fa fa-github-square" style={{ color: '#ffffff' }} /></a>
            <a href=""><FontIcon className="fa fa-google-plus-square" style={{ color: '#ffffff' }} /></a>
            <a href=""><FontIcon className="fa fa-twitter-square" style={{ color: '#ffffff' }} /></a>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <div>Brand {new Date().getFullYear()}</div>
            <a href={`tel:888-888-8888`} style={{ textDecoration: 'none', color: 'inherit' }}>888-888-8888</a>
            <div>name@brand.com</div>
            <div>1234 Pattern St</div>
            <div>Patternville, Ca. 91234</div>
          </div>
        </Paper>
      </footer>
    )
  }
  render() {
    const { business } = this.props
    return (
      business.name ? this.renderFooter() : this.renderBlankFooter()
    )
  }
}

const mapStateToProps = ({ brand: { isFetching, footer, business } }) => ({
  isFetching,
  footer,
  business
})


export default compose(connect(mapStateToProps), muiThemeable())(Footer)
