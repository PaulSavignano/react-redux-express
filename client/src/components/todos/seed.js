import uuidV1 from 'uuid/v1'

const todos = [
  { uuid: uuidV1(), text: 'Play with Westie', completed: true, completedAt: 1 },
  { uuid: uuidV1(), text: 'Walk Pepper', completed: false, completedAt: null },
  { uuid: uuidV1(), text: 'Eat dinner', completed: false, completedAt: null },
]

export default todos
