import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { startAddPage } from '../../actions/page'

import './HomePage.css'
import AdminHero from './AdminHero'
import FeatureList from './FeatureList'
import DialogAlert from '../../../DialogAlert'

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

const AdminHome = ({ home, dispatch }) => {
  console.log('home', home)
  return (
    home ?
    <div>
      <AdminHero {...home} />
    </div>
    :
      <main style={{ height: 1080 }}>
        <h3 style={{ textAlign: 'center' }}>Create your home page!</h3>
        <RaisedButton label="Create" primary={true} fullWidth={true} onClick={() => dispatch(startAddPage('home'))}/>
      </main>

  )
}

const mapStateToProps = (state) => {
  return {
    home: state.pages.find(page => page.name === 'home')
  }
}

export default connect(mapStateToProps)(AdminHome)
