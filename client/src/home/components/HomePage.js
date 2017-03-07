import React, { Component } from 'react'

import Hero from './Hero'
import FeatureList from './FeatureList'

class HomePage extends Component {
  render() {
    return (
      <div>
        <a name="top"></a>
        <Hero />
        <FeatureList />
      </div>
    )
  }
}

export default HomePage
