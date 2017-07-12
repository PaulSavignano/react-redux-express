import React from 'react'

import AdminAppBar from '../../containers/brand/AdminAppBar'
import AdminBusiness from '../../containers/brand/AdminBusiness'
import AdminMain from '../../containers/brand/AdminMain'
import AdminTheme from '../../containers/brand/AdminTheme'
import AdminFooter from '../../containers/brand/AdminFooter'

// width: 256
// height: 128
const imageSpec = {
  type: 'image/png',
  width: 128,
  height: 128
}

const AdminBrand = () => {
  return (
    <section>
      <br/>
      <AdminBusiness /><br/>
      <AdminAppBar imageSpec={imageSpec} /><br/>
      <AdminMain /><br/>
      <AdminTheme /><br/>
      <AdminFooter imageSpec={imageSpec} /><br/>
    </section>
  )
}

export default AdminBrand
