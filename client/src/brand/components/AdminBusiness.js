import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate } from '../actions/index'
import normalizePhone from '../../modules/normalizePhone'

class AdminBusiness extends Component {
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
    const { dispatch, error, handleSubmit, _id, item } = this.props
    console.log(this.props.initialValues)
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
            const path = `business/${_id}`
            dispatch(fetchUpdate(path, values))
          })}
        >
          <CardTitle title="Business" />
          <div style={styles.container}>
            <Field name="name" label="Brand Name" type="text" component={renderTextField} style={styles.field} />
            <Field name="description" label="Brand Description" type="text" component={renderTextField} style={styles.field} />
            <Field name="phone" label="Phone" type="text" component={renderTextField} normalize={normalizePhone} style={styles.field} />
            <Field name="email" label="Email" type="text" component={renderTextField} style={styles.field} />
            <Field name="street" label="Street" type="text" component={renderTextField} style={styles.field} />
            <Field name="city" label="City" type="text" component={renderTextField} style={styles.field} />
            <Field name="state" label="State" type="text" component={renderTextField} style={styles.field} />
            <Field name="zip" label="Zip" type="text" component={renderTextField} style={styles.field} />
            <Field name="facebook" label="facebook" type="text" component={renderTextField} style={styles.field} />
            <Field name="github" label="github" type="text" component={renderTextField} style={styles.field} />
            <Field name="google" label="google" type="text" component={renderTextField} style={styles.field} />
            <Field name="instagram" label="instagram" type="text" component={renderTextField} style={styles.field} />
            <Field name="linkedin" label="linkedin" type="text" component={renderTextField} style={styles.field} />
            <Field name="twitter" label="twitter" type="text" component={renderTextField} style={styles.field} />
            <Field name="yelp" label="yelp" type="text" component={renderTextField} style={styles.field} />
            <Field name="youtube" label="youtube" type="text" component={renderTextField} style={styles.field} />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated Business" : "Update Business"}
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

AdminBusiness = reduxForm({
  form: 'business'
})(AdminBusiness)

const mapStateToProps = (state, { item }) => ({
  initialValues: item
})

AdminBusiness = connect(mapStateToProps)(AdminBusiness)

export default AdminBusiness
