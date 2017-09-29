import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GoogleAnalytics from 'react-ga'

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    })
    GoogleAnalytics.pageview(page);
  }
  const HOC = class extends Component {
    componentDidMount() {
      const { googleAnalyticsUA } = this.props
      GoogleAnalytics.initialize(googleAnalyticsUA);
      const page = this.props.location.pathname
      trackPage(page)
    }
    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname
      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, business: { values: { googleAnalyticsUA }}},
  }) => ({
    googleAnalyticsUA,
    isFetching
  })
  HOC.propTypes = {
    googleAnalyticsUA: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(HOC)
}

export default withTracker
