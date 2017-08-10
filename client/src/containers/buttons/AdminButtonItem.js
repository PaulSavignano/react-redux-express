import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import buttonContainer from './buttonContainer'
import AdminButtonEdit from './AdminButtonEdit'
import { startEdit } from '../../actions/buttons'

const AdminButtonItem = ({ dispatch, item }) => {
  const {
    _id,
    editing,
    values: {
      backgroundColor,
      border,
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      label,
      letterSpacing,
      margin,
      padding,
      textShadow,
      width
    }
  } = item
  const editComp = editing && { children: <AdminButtonEdit key={1} item={item} /> }
  const attributes = {
    backgroundColor,
    label,
    labelColor: color,
    labelStyle: { fontFamily, fontSize, fontWeight, letterSpacing, textShadow },
    style: { backgroundColor, border, flex, margin, padding, width },
    type: 'button',
    onTouchTap: () => dispatch(startEdit(_id)),
    ...editComp
  }
  return (
    <RaisedButton {...attributes} />
  )
}

export default buttonContainer(AdminButtonItem)
