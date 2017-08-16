import React from 'react'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'

import textContainer from '../../containers/texts/textContainer'
import AdminTextEdit from './AdminTextEdit'
import { startEdit } from '../../actions/texts'

const AdminText = ({ dispatch, item }) => {
  const {
    _id,
    editing,
    values: {
      flex,
      margin,
      padding,
      text,
      width
    }
  } = item
  return (
    <Paper
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ flex, margin, width, cursor: 'pointer' }}
      zDepth={0}
      id={_id}
    >
      <div style={{ padding }}>{renderHTML(text)}</div>
      {editing && <AdminTextEdit item={item} />}
    </Paper>
  )
}

export default textContainer(AdminText)
