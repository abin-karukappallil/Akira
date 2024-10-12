import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.rememberContainer}>
        <TouchableOpacity style={styles.checkbox}>
          {/* Add checkbox logic here */}
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember me</Text>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.orText}>Or</Text>
      
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Feather name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.twitterButton]}>
          <Feather name="twitter" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
          <Feather name="apple" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    marginRight: 10,
  },
  rememberText: {
    color: 'gray',
  },
  forgotPassword: {
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    color: '#FF8C00',
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: 'gray',
  },
  signupLink: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  orText: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  appleButton: {
    backgroundColor: 'white',
  },
});

export default LoginScreen;