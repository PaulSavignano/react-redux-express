import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { startAddProduct } from '../actions/product'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Please enter a product name'
  }
  if (!values.description) {
    errors.password = 'Please enter a description'
  }
  if (!values.price) {
    errors.password = 'Please enter a price'
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
  form: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    minHeight: 'auto',
    alignItems: 'center'
  },
  textField: {
    flex: '1 1 auto',
  }
}

const AdminProductAdd = ({ dispatch, handleSubmit, reset }) => (
  <div className="mdl-grid">
    <form
      onSubmit={handleSubmit((values) => {
        dispatch(startAddProduct(values))
        reset()
      }
      )}
      style={styles.form}
      className="mdl-grid mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp"
    >
      <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
        <img className="article-image" src="http://placehold.it/275x250" alt="" />
      </div>

      <div className="mdl-cell mdl-cell--8-col">
        <Field
          name="name"
          label="Name"
          type="text"
          component={renderField}
        />
        <Field
          name="description"
          label="Description"
          type="text"
          component={renderField}
        />
        <Field
          name="price"
          label="Price"
          type="number"
          component={renderField}
        />
        <button
          className="mdl-button mdl-js-button mdl-button--raised"
          type="submit"
        >
          Add
        </button>
      </div>

    </form>
  </div>
)


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AdminProductAdd)
