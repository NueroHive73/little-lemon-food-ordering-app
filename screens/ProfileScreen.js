import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({
  navigation,
  setIsOnboarded,
}) {
  const [firstName, setFirstName] =
    useState('');

  const [lastName, setLastName] =
    useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedFirstName =
        await AsyncStorage.getItem(
          'firstName'
        );

      const storedLastName =
        await AsyncStorage.getItem(
          'lastName'
        );

      const storedEmail =
        await AsyncStorage.getItem(
          'email'
        );

      const storedPhone =
        await AsyncStorage.getItem(
          'phone'
        );

      if (storedFirstName)
        setFirstName(storedFirstName);

      if (storedLastName)
        setLastName(storedLastName);

      if (storedEmail)
        setEmail(storedEmail);

      if (storedPhone)
        setPhone(storedPhone);
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async () => {
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

      Alert.alert(
        'Success',
        'Profile updated successfully'
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();

      setIsOnboarded(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButton}>
            ←
          </Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/logo.jpeg')}
          style={styles.logo}
        />

        <View style={{ width: 30 }} />
      </View>

      {/* PROFILE IMAGE */}

      <Text style={styles.sectionTitle}>
        Personal Information
      </Text>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/avatar.jpeg')}
          style={styles.avatar}
        />

        <View style={styles.avatarButtons}>
          <TouchableOpacity
            style={styles.changeButton}
          >
            <Text style={styles.buttonText}>
              Change
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* INPUTS */}

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
      />

      {/* BUTTONS */}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          Log out
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.discardButton}
        >
          <Text style={styles.discardText}>
            Discard Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveChanges}
        >
          <Text style={styles.saveText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },

  backButton: {
    fontSize: 28,
    fontWeight: '700',
  },

  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 20,
  },

  avatarButtons: {
    flex: 1,
  },

  changeButton: {
    backgroundColor: '#495E57',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  removeButton: {
    borderWidth: 1,
    borderColor: '#495E57',
    padding: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },

  removeText: {
    color: '#495E57',
    textAlign: 'center',
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    fontSize: 16,
  },

  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#D9534F',
    padding: 16,
    borderRadius: 12,
  },

  logoutText: {
    color: '#D9534F',
    textAlign: 'center',
    fontWeight: '700',
  },

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },

  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    padding: 16,
    borderRadius: 12,
    marginRight: 10,
  },

  discardText: {
    textAlign: 'center',
    color: '#495E57',
    fontWeight: '700',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#495E57',
    padding: 16,
    borderRadius: 12,
  },

  saveText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});