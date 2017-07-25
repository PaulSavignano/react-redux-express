import React from 'react'

import AdminAppBar from '../../containers/brand/AdminAppBar'
import AdminBusiness from '../../containers/brand/AdminBusiness'
import AdminMain from '../../containers/brand/AdminMain'
import AdminTheme from '../../containers/brand/AdminTheme'
import AdminFooter from '../../containers/brand/AdminFooter'

const AdminBrand = () => {
  return (
    <section>
      <br/>
      <AdminBusiness />
      <br/>
      <AdminAppBar />
      <br/>
      <AdminMain />
      <br/>
      <AdminTheme />
      <br/>
      <AdminFooter />
      <br/><br/>
    </section>
  )
}

export default AdminBrand
