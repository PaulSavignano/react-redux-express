import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './page.css'
import AdminPageEdit from './AdminPageEdit'
import AdminItemForm from '../forms/AdminItemForm'
import pageContainer from '../../containers/pages/pageContainer'
import renderAdminSections from './renderAdminSections'

class AdminPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  render() {
    const {
      dispatch,
      page: {
        _id,
        slug,
        sections,
        values: { backgroundColor }
      }
    } = this.props
    return (
      <div style={{ backgroundColor }} className="AdminPage" >
        <div>
          {renderAdminSections({
            dispatch,
            sections,
            pageId: _id,
            pageSlug: slug
          })}
        </div>
        <AdminPageEdit
          dispatch={dispatch}
          page={this.props.page}
        />
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
