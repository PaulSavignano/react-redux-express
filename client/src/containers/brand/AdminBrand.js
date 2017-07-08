import React from 'react'

import AdminAppBar from './AdminAppBar'
import AdminBusiness from './AdminBusiness'
import AdminMain from './AdminMain'
import AdminTheme from './AdminTheme'
import AdminFooter from './AdminFooter'

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
      <AdminBusiness /><br/><br/>
      <AdminAppBar imageSpec={imageSpec} /><br/><br/>
      <AdminMain /><br/><br/>
      <AdminTheme /><br/><br/>
      <AdminFooter imageSpec={imageSpec} />
    </section>
  )
}

export default AdminBrand
