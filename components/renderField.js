import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'


const renderField = ({ input, label, type, placeholder, style, meta: { touched, error, invalid, warning } }) => (
  <View>
    <TextInput {...input}
        style={style}
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={false}
        keyboardType='email-address'
        placeholder={placeholder}
        value={input.value}
        onChangeText={input.onChange} />
      {touched && ((error && <Text>{error}</Text>) || (warning && <Text>{warning}</Text>))}
  </View>
)

export default renderField;
