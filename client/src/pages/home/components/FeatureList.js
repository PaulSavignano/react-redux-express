import React, { Component } from 'react'
import { connect } from 'react-redux'
import Feature from './Feature'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const FeatureList = ({ features }) => (
  features.length > 0 ?
  <div style={styles.grid}>
    {features.map(feature => (
      <Feature
        key={feature._id}
        {...feature}
      />
    ))}
  </div> :
  <div><p className="container__message">No features yet</p></div>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(FeatureList)
