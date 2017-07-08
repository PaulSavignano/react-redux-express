import React from 'react'
import { connect } from 'react-redux'

import AdminSectionAdd from './AdminSectionAdd'
import AdminSectionList from './AdminSectionList'

const imageSpec = {
  type: 'image/jpg',
  width: 1920,
  height: 1080
}

const AdminSections = ({ page }) => (
  <section style={{ maxWidth: 2000 }}>
    <AdminSectionList page={page} imageSpec={imageSpec} />
    <AdminSectionAdd page={page} />
  </section>
)



export default AdminSections
