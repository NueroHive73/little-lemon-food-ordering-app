import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({
  setIsOnboarded,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isFormValid =
    firstName &&
    lastName &&
    email &&
    phone;

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem(
        'firstName',
        firstName
      );

      await AsyncStorage.setItem(
        'lastName',
        lastName
      );

      await AsyncStorage.setItem(
        'email',
        email
      );

      await AsyncStorage.setItem(
        'phone',
        phone
      );

      await AsyncStorage.setItem(
        'isOnboarded',
        'true'
      );

      setIsOnboarded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <Image
        source={require('../assets/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Little Lemon
      </Text>

      <Text style={styles.subtitle}>
        Let us get to know you
      </Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[
          styles.button,
          !isFormValid && styles.disabledButton,
        ]}
        disabled={!isFormValid}
        onPress={saveUserData}
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333333',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#666666',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#333333',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },

  disabledButton: {
    backgroundColor: '#BDBDBD',
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});