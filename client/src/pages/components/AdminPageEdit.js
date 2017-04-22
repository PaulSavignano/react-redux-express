import React from 'react'

import AdminHero from './AdminHero'
import Test from './Test'

const AdminPageEdit = (props) => {
  return (
    <section>
      <AdminHero {...props}/>
      <Test />
    </section>
  )
}

export default AdminPageEdit
