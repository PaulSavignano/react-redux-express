import React from 'react'
import { connect } from 'react-redux'

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


const AdminBrand = ({ isFetching, _id, appBar, business, main, theme, footer }) => {
  return (
    isFetching ? null :
    <section>
      <AdminBusiness _id={_id} item={business} imageSpec={imageSpec} /><br/><br/>
      <AdminAppBar _id={_id} item={appBar}  imageSpec={imageSpec} /><br/><br/>
      <AdminMain _id={_id} item={main} /><br/><br/>
      <AdminTheme _id={_id} item={theme} /><br/><br/>
      <AdminFooter _id={_id} item={footer} imageSpec={imageSpec} />
    </section>
  )
}

const mapStateToProps = ({ brand: { isFetching, _id, appBar, business, main, theme, footer } }) => ({
  isFetching,
  _id,
  appBar,
  business,
  main,
  theme,
  footer
})

export default connect(mapStateToProps)(AdminBrand)
