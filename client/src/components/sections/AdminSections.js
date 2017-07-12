import React from 'react'

import AdminSectionAdd from '../../containers/sections/AdminSectionAdd'
import AdminSectionList from '../../containers/sections/AdminSectionList'

const imageSpec = {
  type: 'image/jpg',
  width: 1920,
  height: 1080
}

const AdminSections = ({ page }) => (
  <section style={{ maxWidth: 2000, margin: '32px 0' }}>
    <AdminSectionList page={page} imageSpec={imageSpec} />
    <AdminSectionAdd page={page} />
  </section>
)



export default AdminSections
