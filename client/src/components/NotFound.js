import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

const NotFound = () => (
  <section className="page">
    <Card zDepth={0}>
      <CardTitle title="Sorry, that page does not exist." />
    </Card>
  </section>
)

export default NotFound
