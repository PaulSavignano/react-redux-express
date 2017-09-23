import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"

const Head = ({
  description,
  image,
  isFetching,
  name
}) => (
  isFetching ? null :
  <Helmet>
    <meta charSet="utf-8" />
    {name && <title>{name}</title>}
    {description && <meta name="description" content={description} />}
    {image && image.src ? <link rel="shortcut icon" href={image.src} /> : null}
    {image && image.src ? <link rel="apple-touch-icon" sizes="180x180" href={image.src} /> : null}
    <link rel="canonical" href={window.location.hostname} />
  </Helmet>
)

const mapStateToProps = ({
  brand: {
    business: {
      image,
      values: {
        name,
        description
      }
    },
    isFetching,
  }
}) => ({
  description,
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
