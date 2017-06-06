import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const AdminBrandImage = ({ dispatch, brand, imageSize, placeholdIt }) => {
  return (
    <Card>
      <ImageForm
        type="image/png"
        handleUpdate={fetchUpdate}
        width={imageSize.width}
        height={imageSize.height}
        ref={this.setEditorRef}
        placeholdIt={placeholdIt}
        item={brand}
      />
    </Card>
  )
}


export default AdminBrandImage
