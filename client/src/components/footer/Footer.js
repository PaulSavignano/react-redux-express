import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

class Footer extends Component {
  state = {
    image: null,
    loading: true
  }
  componentWillMount() {
    const { image } = this.props.footer
    if (image && image.src) {
      const img = new Image()
      const src = image.src
      img.onload = () => this.setState({ image: src, loading: false })
      img.src = src
    } else {
      this.setState({ loading: false })
    }
  }
  componentWillReceiveProps({ footer: { image }, updatedAt }) {
    if (image && image.src && this.props.item.updatedAt !== updatedAt) return this.setState({ image: `${image.src}?${updatedAt}` })
    if (!image || !image.src) return this.setState({ image: null })
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
    const margin = styles.margin || null
    return (
      <footer style={{ borderBottom, borderTop }}>
        <Paper style={{ backgroundColor, color }}>
          <div style={{ textAlign: 'center', padding: 32 }}>
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
              <Link to="/" style={{}}>{name ? name : 'Brand'} {new Date().getFullYear()}</Link>
              { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a></div> }
              { email && <div>{email}</div> }
              { street && <div>{street}</div> }
              { city && <div>{city}, {state}. {zip}</div> }
            </div>
          </div>

          {image &&
            <div>
              <img src={image} alt="" style={{ display: 'block', margin }}/>
            </div>
          }
        </Paper>
      </footer>
    )
  }
}


export default Footer