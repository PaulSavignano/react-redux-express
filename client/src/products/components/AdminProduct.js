import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { startUpdateProduct, startDeleteProduct } from '../actions/product'
import ImageUpload from './ImageUpload'

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

const renderField = ({ input, label, type, value, meta: { touched, error }}) => {
  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input {...input} className="mdl-textfield__input" placeholder={label} type={type} value={input.value}/>
      {touched && error && <span className="mdl-textfield__error">{error}</span>}
    </div>
  )
}


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


let AdminProduct = ({ handleSubmit, _id, dispatch, image }) => (
  <form
    onSubmit={handleSubmit((values) => {
      const image = document.querySelector('[name="' + _id + '"]').toDataURL('image/jpg')
      dispatch(startUpdateProduct(values, image))
    })}
    style={styles.form}
    className="mdl-grid mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp"
  >
    <ImageUpload width="275" height="250" image={image} _id={_id} />

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
        Update
      </button>
      <button
        type="button"
        className="mdl-button mdl-js-button mdl-button--raised"
        onClick={() => dispatch(startDeleteProduct(_id))}
      >
        Delete
      </button>
    </div>
  </form>
)

AdminProduct = compose(
  connect((state, props) => ({form: props._id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: [], validate}))(AdminProduct)


export default AdminProduct
