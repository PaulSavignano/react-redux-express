import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { signinUser } from '../actions/index'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter an email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Please enter a password'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error }}) => (
  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input {...input} className="mdl-textfield__input" placeholder={label} type={type}/>
    {touched && error && <span className="mdl-textfield__error">{error}</span>}
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  },

}

let Signin = (props) => {
  const { dispatch, handleSubmit, submitting } = props
  const nextPathname = props.location.state ? props.location.state.nextPathname : null
  return (
    <div className="mdl-grid portfolio-max-width portfolio-contact">
      <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Sign in</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
          </p>
          <p>
            Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet.
          </p>
          <form onSubmit={handleSubmit(values => dispatch(signinUser(values, nextPathname)))} className="">
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
            <p>
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" disabled={submitting} type="submit">
                Sign In
              </button>
            </p>
          </form>
          <div style={ styles.container }>
            <p>Don't have an account? <Link to="/signup">Sign up instead!</Link></p>
            <p>Forgot your password?</p>
          </div>

        </div>
      </div>
    </div>
  )
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin)

Signin = connect()(Signin)

export default Signin
