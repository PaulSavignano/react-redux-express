import React from 'react'
import { connect } from 'react-redux'

import './HomePage.css'
import Hero from './Hero'
import FeatureList from './FeatureList'
import DialogAlert from '../../DialogAlert'

const HomePage = ({ user }) => (
  <div>
    <a name="top"></a>
    {user ? <DialogAlert message={`Welcome back ${user}`} error={false}/> : ''}
    <Hero />
    <FeatureList />
  </div>
)

const mapStateToProps = (state) => ({
  user: state.user.name
})

export default connect()(HomePage)
