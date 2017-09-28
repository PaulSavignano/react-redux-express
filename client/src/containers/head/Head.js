import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"

const Head = ({
  description,
  keywords,
  image,
  isFetching,
  name
}) => (
  isFetching ? null :
  <Helmet>
    <meta charSet="utf-8" />
    {name && <title>{name}</title>}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    {image && image.src ? <link rel="apple-touch-icon" sizes="180x180" href={image.src} /> : null }
    {image && image.src ? <link rel="icon" type="image/png" href={image.src} sizes="32x32" /> : null}
    {image && image.src ? <link rel="icon" type="image/png" href={image.src} sizes="16x16" /> : null }
    <link rel="canonical" href={window.location.hostname} />
  </Helmet>
)

const mapStateToProps = ({
  brand: {
    business: {
      image,
      values: {
        name,
        description,
        keywords
      }
    },
    isFetching,
  }
}) => ({
  description,
  keywords,
  image,
  isFetching,
  name
})

Head.propTypes = {
  description: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  image: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  name: PropTypes.string,
}

export default connect(mapStateToProps)(Head)
