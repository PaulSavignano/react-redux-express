import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate } from '../actions/index'
import normalizePhone from '../../modules/normalizePhone'

class AdminMain extends Component {
  state = {
    zDepth: 1,
    submitted: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const { dispatch, handleSubmit, error, _id, item } = this.props
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: 4
      },
      field: {
        flex: '1 1 auto',
        margin: 4
      }
    }
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <form
          onSubmit={handleSubmit((values) => {
            const path = `main/${_id}`
            dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Main" />
          <div style={styles.container}>
            <Field name="color" label="color" type="text" component={renderTextField} style={styles.field} />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated Main" : "Update Main"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              fullWidth={true}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

AdminMain = reduxForm({
  form: 'main'
})(AdminMain)

const mapStateToProps = (state, { item }) => ({
  initialValues: item
})

AdminMain = connect(mapStateToProps)(AdminMain)

export default AdminMain
