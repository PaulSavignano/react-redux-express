import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

class Footer extends Component {
  state = {
    image: null,
    loading: false
  }
  componentDidMount() {
    const { image } = this.props.footer
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
  }
  componentWillReceiveProps({ footer: { image }}) {
    if (image) return this.setState({ image: `${image.src}?${new Date().getTime()}`})
    this.setState({ image: null })
  }
  render() {
    const { image } = this.state
    const { footer: { styles }, business} = this.props
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
    const backgroundColor = styles ? styles.backgroundColor : 'rgb(0, 188, 212)'
    const color = styles ? styles.color : '#ffffff'
    const borderTop = styles.borderTop || null
    const borderBottom = styles.borderBottom || null
    const backgrounds = image && {
      backgroundImage: `url(${image})`,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: `center ${styles.imageAlign}`,
      backgroundRepeat:  'no-repeat',
      zIndex: -1
    }
    return (
      <footer style={{ borderBottom, borderTop }}>
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
            { phone && <a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a> }
            { email && <div>{email}</div> }
            { street && <div>{street}</div> }
            { city && <div>{city}, {state}. {zip}</div> }
          </div>
        </Paper>
      </footer>
    )
  }
}


export default Footer
