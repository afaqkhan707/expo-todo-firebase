import React from 'react';
import { KeyboardAvoidingView, Text, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseTextInput } from '@/components/BaseTextInput';
import { BaseButton } from '@/components/BaseButton';
import { Colors } from '@/constants/Colors';
import { useFormik } from 'formik';
import { signupValidationSchema } from '@/schemas';
import auth from '@react-native-firebase/auth';
import { useNavigation } from 'expo-router';
import { FirebaseError } from 'firebase/app';
const Signup = () => {
const navigation = useNavigation<any>();
  const formikLogin = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Signup Data:', values);
      setSubmitting(true);
    
      try {
        await auth().createUserWithEmailAndPassword(values.email, values.password);
        // Navigate to the drawer after successful signup
        navigation.replace("(drawer)/drawer");
        
      } catch (e:any) {
        const err = e as FirebaseError;
        if (err.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (err.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else {
          console.error(err);
        }
      } finally {
        setSubmitting(false);
      }
    },
   });
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyBoardContainer} behavior={Platform.OS=="ios"?"padding":undefined}>
        <View>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
        <BaseTextInput
            placeholder="Full Name"
            value={formikLogin.values.name}
            onChangeText={formikLogin.handleChange('name')}
            onBlur={formikLogin.handleBlur('name')}
          />
          {formikLogin.touched.name && formikLogin.errors.name && (
            <Text style={styles.errorText}>{formikLogin.errors.name}</Text>
          )}
          <BaseTextInput
            placeholder="Email"
            value={formikLogin.values.email}
            onChangeText={formikLogin.handleChange('email')}
            onBlur={formikLogin.handleBlur('email')}
          />
          {formikLogin.touched.email && formikLogin.errors.email && (
            <Text style={styles.errorText}>{formikLogin.errors.email}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <BaseTextInput
            placeholder="Password"
            secureTextEntry={true}
            value={formikLogin.values.password}
            onChangeText={formikLogin.handleChange('password')}
            onBlur={formikLogin.handleBlur('password')}
          />
          {formikLogin.touched.password && formikLogin.errors.password && (
            <Text style={styles.errorText}>{formikLogin.errors.password}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <BaseTextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={formikLogin.values.confirmPassword}
            onChangeText={formikLogin.handleChange('confirmPassword')}
            onBlur={formikLogin.handleBlur('confirmPassword')}
          />
          {formikLogin.touched.confirmPassword && formikLogin.errors.confirmPassword && (
            <Text style={styles.errorText}>{formikLogin.errors.confirmPassword}</Text>
          )}
        </View>
        <BaseButton onPress={formikLogin.handleSubmit} text={"Signup"} loading={formikLogin.isSubmitting} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  keyBoardContainer: {
    flex: 1, backgroundColor: Colors.white, paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.black,

  },
  inputContainer: {
    marginVertical: 10,
    width: "100%"
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signup;
