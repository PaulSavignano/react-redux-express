export const type = 'EDIT_ITEM'

const START_EDIT = `START_EDIT_${type}`
const STOP_EDIT = `STOP_EDIT_${type}`

export const startEdit = (item, kind) => ({
  type: START_EDIT,
  kind,
  item
})

export const stopEdit = () => ({ type: STOP_EDIT })
