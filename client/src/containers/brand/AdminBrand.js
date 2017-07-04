import React from 'react'
import { connect } from 'react-redux'

import AdminAppBar from '../../components/brand/AdminAppBar'
import AdminBusiness from '../../components/brand/AdminBusiness'
import AdminMain from '../../components/brand/AdminMain'
import AdminTheme from '../../components/brand/AdminTheme'
import AdminFooter from '../../components/brand/AdminFooter'

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
