import React from 'react'
import PropTypes from 'prop-types'

import pagesContainer from '../../containers/pages/pagesContainer'
import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesItem from './AdminPagesItem'

const AdminPages = ({
  dispatch,
  pages
}) => (
  <section style={{ minHeight: '80vh', padding: '32px 0'}}>
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
)

AdminPages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired
}

export default pagesContainer(AdminPages)
