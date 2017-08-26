import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import heroContainer from '../../containers/heros/heroContainer'
import loadImage from '../images/loadImage'
import AdminHero from './AdminHero'
import { fetchUpdate, fetchDelete } from '../../actions/heroSections'
import { fetchAdd } from '../../actions/heros'
import { startEdit } from '../../actions/editItem'

class AdminHeroSection extends Component {
  handleAdd = () => {
    const { dispatch, item: { _id }} = this.props
    return dispatch(fetchAdd({ sectionId: _id }))
  }
  handleStartEdit = () => {
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'HERO_SECTION' }))
  }
  render() {
    const {
      dispatch,
      item: {
        _id,
        items,
        values
      }
    } = this.props
    const backgroundColor = values && values.backgroundColor
    return (
      <div
        style={{
          backgroundColor,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 60
        }}
        className="hero-section"
      >
        {items.map(item => (
          <AdminHero
            key={item._id}
            item={item}
          />
        ))}
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <RaisedButton
            label="Add Hero"
            onTouchTap={this.handleAdd}
            style={{ margin: 8 }}
          />
          <RaisedButton
            label="Edit Section"
            onTouchTap={this.handleStartEdit}
            style={{ margin: 8 }}
          />
        </div>
      </div>
    )
  }
}

AdminHeroSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default AdminHeroSection
