export const type = 'ARTICLE'

const START_PLAY = `START_PLAY_${type}`
const STOP_PLAY = `STOP_PLAY_${type}`

export const startPlay = () => ({ type: START_PLAY })
export const stopPlay = () => ({ type: STOP_PLAY })
