import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

const NotFound = () => (
  <div className="page">
    <section className="section-margin">
      <Card zDepth={0}>
        <CardTitle title="Sorry, that page does not exist." />
      </Card>
    </section>
  </div>
)

export default NotFound
