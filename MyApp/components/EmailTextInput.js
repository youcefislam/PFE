import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

const EmailTextInput = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true)
  return (
      <View style={{}} behavior='padding'>
        <TextInput
        style={validEmail ?styles.input:styles.inputError}
        onEndEditing={()=> handleEmail()}
        placeholder="Email"
        autoCompleteType="email"
        onChangeText={(val) => setEmail(val)} />
        </View>
      );
};