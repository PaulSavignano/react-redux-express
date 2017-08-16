import React from 'react'

import AdminAppBar from '../../containers/brand/AdminAppBar'
import AdminBusiness from '../../containers/brand/AdminBusiness'
import AdminBody from '../../containers/brand/AdminBody'
import AdminTheme from '../../containers/brand/AdminTheme'
import AdminFooter from '../../containers/brand/AdminFooter'

const AdminBrand = () => {
  return (
    <section className="page">
      <AdminBusiness />
      <br/>
      <AdminAppBar />
      <br/>
      <AdminBody />
      <br/>
      <AdminTheme />
      <br/>
      <AdminFooter />
      <br/><br/>
    </section>
  )
}

export default AdminBrand
