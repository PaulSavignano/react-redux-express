import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate } from '../actions/index'

class AdminTheme extends Component {
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
    const { dispatch, error, handleSubmit, item } = this.props
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
            const path = `theme/${item._id}`
            dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Theme" />
          <div style={styles.container}>
            <Field name="fontFamily" label="fontFamily" type="text" component={renderTextField} style={styles.field} />
            <Field name="fontFamily2" label="fontFamily2" type="text" component={renderTextField} style={styles.field} />
            <Field name="fontFamily3" label="fontFamily3" type="text" component={renderTextField} style={styles.field} />
            <Field name="primary1Color" label="primary1Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="primary2Color" label="primary2Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="primary3Color" label="primary3Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="accent1Color" label="accent1Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="accent2Color" label="accent2Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="accent3Color" label="accent3Color" type="text" component={renderTextField} style={styles.field} />
            <Field name="textColor" label="textColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="secondaryTextColor" label="secondaryTextColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="alternateTextColor" label="alternateTextColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="canvasColor" label="canvasColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="borderColor" label="borderColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="disabledColor" label="disabledColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="pickerHeaderColor" label="pickerHeaderColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="clockCircleColor" label="clockCircleColor" type="text" component={renderTextField} style={styles.field} />
            <Field name="shadowColor" label="shadowColor" type="text" component={renderTextField} style={styles.field} />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated Theme" : "Update Theme"}
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

AdminTheme = reduxForm({
  form: 'theme'
})(AdminTheme)

const mapStateToProps = (state, { item }) => ({
  initialValues: {
    ...item,
    ...item.palette
  }
})

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
