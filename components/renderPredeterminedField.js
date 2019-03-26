import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { red, orange } from '../utils/colors'


const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

const renderPredeterminedField = ({ input, label, type, placeholder, data, style, reset, meta,  meta: { visited, touched, error, invalid, warning, dirty, pristine } }) => (
  <View>
  {reset && console.log('FIELD HAS BEEN RESET')}
  {visited
    ? <TextInput {...input}
        style={style}
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={false}
        keyboardType='default'
        placeholder={placeholder}
        defaultValue={data}
        value={input.value}
        onChangeText={input.onChange &&
          console.log(
            'LOG OF DATA FROM INSIDE PREDETERMINED FIELD COMPONENT AFTER VISITED ----- ', data,
            'LOG OF INPUT VALUE FROM INSIDE PREDETERMINED FIELD COMPONENT AFTER VISITED ----- ', input.value
          )
        }
        onBlur={input.onBlur}
        onFocus={input.onFocus} />
    : <TextInput {...input}
        style={style}
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={false}
        keyboardType='default'
        placeholder={placeholder}
        value={data}
        onChangeText={input.onChange && console.log('LOG FROM INSIDE UNTOUCHED PREDETERMINED FIELD COMPONENT ', input.value)}
        onBlur={input.onBlur}
        onFocus={input.onFocus} />
  }
    <Text>The { input.name} input is:</Text>
    {
    formStates.filter((state) => meta[state]).map((state) => {
      return <Text key={state}> - { state }</Text>;
    })
    }
      {touched && (
        (error && <Text style={{ fontSize: 20, color: red, }}>{error}</Text>) ||
        (warning && <Text style={{ fontSize: 20, color: orange }}>{warning}</Text>)
      )}
  </View>
)

export default renderPredeterminedField;
