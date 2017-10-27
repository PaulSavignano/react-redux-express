import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AdminPageEditButtons from './AdminPageEditButtons'
import AdminItemForm from '../forms/AdminItemForm'
import pageContainer from '../../containers/pages/pageContainer'
import AdminSectionSwitch from './AdminSectionSwitch'

class AdminPage extends Component {
  render() {
    const {
      dispatch,
      page: {
        _id,
        slug,
        sections,
        values: { backgroundColor }
      },
      propsForParent,
      textColor
    } = this.props
    return (
      <div {...propsForParent} >
        {sections.map(section => (
          <AdminSectionSwitch
            dispatch={dispatch}
            key={section._id}
            pageId={_id}
            pageSlug={slug}
            section={section}
          />
        ))}
        <AdminPageEditButtons
          dispatch={dispatch}
          page={this.props.page}
          textColor={textColor}
        />
        <AdminItemForm />
      </div>
    )
  }
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
  textColor: PropTypes.string,
}

export default pageContainer(AdminPage)
