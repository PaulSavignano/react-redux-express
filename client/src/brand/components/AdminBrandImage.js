import React from 'react'
import { Card } from 'material-ui/Card'

import { fetchUpdate } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const AdminBrandImage = ({ dispatch, brand, imageSize }) => {
  return (
    <Card>
      <ImageForm
        type="image/png"
        handleUpdate={fetchUpdate}
        width={imageSize.width}
        height={imageSize.height}
        ref={this.setEditorRef}
        item={brand}
      />
    </Card>
  )
}


export default AdminBrandImage
