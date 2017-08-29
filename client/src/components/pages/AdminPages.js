import React from 'react'
import PropTypes from 'prop-types'

import pagesContainer from '../../containers/pages/pagesContainer'
import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesItem from './AdminPagesItem'

const AdminPages = ({
  dispatch,
  pages
}) => (
  <div className="page">
    <section className="section-margin">
      <AdminPagesAdd />
      {pages.map(item => (
        <AdminPagesItem
          key={item._id}
          item={item}
          initialValues={item.values}
          form={`page_${item._id}`}
        />
      ))}
    </section>
  </div>
)

AdminPages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired
}

export default pagesContainer(AdminPages)
