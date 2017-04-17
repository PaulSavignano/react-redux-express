import React from 'react'
import { connect } from 'react-redux'

import './HomePage.css'
import Hero from './Hero'
import FeatureList from './FeatureList'
import DialogAlert from '../../../DialogAlert'

const HomePage = ({ content, user }) => (
  <div>
    <a name="top"></a>
    {user ? <DialogAlert message={`Welcome back ${user}`} error={false}/> : ''}
    <Hero />

  </div>
)

const mapStateToProps = (state) => ({
  content: state.homePage,
  user: state.user.name
})

export default connect()(HomePage)
