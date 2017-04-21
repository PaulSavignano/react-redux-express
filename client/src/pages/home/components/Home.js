import React from 'react'
import { connect } from 'react-redux'

import Hero from './Hero'
import FeatureList from './FeatureList'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'column',
    maxwWidth: 1044,
    height: 1080,
    padding: 80,
    marginRight: 'auto',
    marginLeft: 'auto'
  }
}

const Home = ({ home, dispatch }) => {
  return (
    <div>
      <Hero {...home} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    home: state.pages.find(page => page.name === 'home')
  }
}

export default connect(mapStateToProps)(Home)
