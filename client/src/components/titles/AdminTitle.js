import React from 'react'

import titleContainer from '../../containers/titles/titleContainer'
import AdminTitleEdit from './AdminTitleEdit'
import { startEdit } from '../../actions/titles'

const AdminTitle = ({ dispatch, item }) => {
  const {
    _id,
    editing,
    values: {
      color,
      flex,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      margin,
      padding,
      textAlign,
      textShadow,
      text,
      width
    }
  } = item
  return (
    <div
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{
        color,
        flex,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        margin,
        padding,
        textAlign,
        textShadow,
        width,
        cursor: 'pointer'
      }}
      id={_id}
    >
      {text}
      {editing && <AdminTitleEdit item={item} />}
    </div>
  )
}

export default titleContainer(AdminTitle)
