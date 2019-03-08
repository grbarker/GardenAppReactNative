import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextButton from './TextButton'
import 'moment-timezone';
import { connect } from 'react-redux'
import { white, black, gray, purple, green, blue, my_green, my_blue, pink, lightPurp, red, orange} from '../utils/colors'
import { getUserGardens, submitUserGarden, submitUserGardenFetch, hideGardenInput } from '../actions/usergardens'
import renderField from './renderField'
import axios from 'axios';



class GardenForm extends Component {


  render() {
    const { handleSubmit, submitting, reset, pristine, data, style } = this.props

    return (
      <ScrollView onSubmit={handleSubmit}>
        <Field
          name="garden"
          type="text"
          component={renderField}
          label="Plant Name"
          placeholder="What is the name of your new garden?"
          style={style.reduxFormField}
        />
        <Field
          name="address"
          type="text"
          component={renderField}
          label="Address"
          placeholder="What is the address of your new garden?"
          style={style.reduxFormField}
        />
        <View>
          <Button title='Submit' type="submit" disabled={pristine || submitting} onPress={handleSubmit}>
            Submit
          </Button>
          <Button title='Cancel' type="button" disabled={pristine || submitting} onPress={reset}>
            Clear Values
          </Button>
        </View>
      </ScrollView>
    )
  }
}


GardenForm = reduxForm({
  form: 'garden',
  validate: (values) => {
    const errors = {};
    errors.garden = !values.garden
      ? 'Garden field is required'
      : undefined;

    errors.address = !values.address
      ? 'Address field is required'
      :  undefined;

    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${values.address}&key=AIzaSyCyX0uZDxs4ekWQz-uSuhvhpABMOFf8QfI`,
    }).then((response, errors) => {

      //console.log(response.data.status);

      if (response.data.status === "ZERO_RESULTS") {
        errors.address = 'Invalid Address'
        console.log('Invalid Address')
        return errors
      } else {
        console.log('No Error')
        return errors.address = undefined
      }
    })

    return errors;
  }
})(GardenForm);


export default GardenForm


const styles = StyleSheet.create ({
   container: {
      padding: 5,
      marginTop: 3,
      backgroundColor: '#f0f4f0',
      alignItems: 'center',
   },
   errorContainer: {
     padding: 5,
     marginTop: 3,
     marginBottom: 30,
     backgroundColor: '#d9f9b1',
     alignItems: 'center',
   },
   text: {
     fontSize: 20,
      color: black
   },
   gardenInputField: {
     margin: 5,
     padding: 5,
     backgroundColor: '#f0f4f0',
     borderWidth: 2,
     borderColor: my_green,

   }
})
