import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import './page.css'
import AdminItemForm from '../forms/AdminItemForm'
import pageContainer from '../../containers/pages/pageContainer'
import renderAdminSections from './renderAdminSections'
import { fetchAdd } from '../../actions/sections'

class AdminPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  handleAddSection = () => {
    const { dispatch, page: { _id, slug }} = this.props
    return dispatch(fetchAdd({ pageId: _id, pageSlug: slug }))
  }
  render() {
    const {
      dispatch,
      page: { _id, slug, sections }
    } = this.props
    return (
      <div className="admin-page">
        <div>
          {renderAdminSections({
            dispatch,
            sections,
            pageId: _id,
            pageSlug: slug
          })}
        </div>
        <section style={{ display: 'flex', maxWidth: 1044, margin: '0 auto' }}>
          <RaisedButton
            onTouchTap={this.handleAddSection}
            label="Add Section"
            primary={true}
            style={{ flex: '1 1 auto', margin: 4 }}
          />
        </section>
        <AdminItemForm />
      </div>
    )
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
}

export default pageContainer(AdminPage)
