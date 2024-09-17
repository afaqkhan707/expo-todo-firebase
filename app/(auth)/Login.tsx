import React from 'react';
import { KeyboardAvoidingView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseTextInput } from '@/components/BaseTextInput';
import { BaseButton } from '@/components/BaseButton';
// import { formik } from '@/schemas/loginValidation';
import { Colors } from '@/constants/Colors';
import { useFormik } from 'formik';
import { loginValidationSchema } from '@/schemas';
import auth from '@react-native-firebase/auth';
import { useNavigation } from 'expo-router';
import { FirebaseError } from 'firebase/app';
const Login = () => {
const navigation = useNavigation<any>();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values,{ setSubmitting }) => {
      console.log('Login Data:', values);
      setSubmitting(true)
      try {
        const userCredential = await auth().signInWithEmailAndPassword(values?.email, values?.password);
        console.log('User signed in:', userCredential.user);
      } catch (e:any) {
        const err=e as FirebaseError
        if (err.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (err.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else if (err.code === 'auth/wrong-password') {
          console.log('Incorrect password.');
        } else if (err.code === 'auth/user-not-found') {
          console.log('No user found with that email address.');
        } else {
          console.error('An unexpected err occurred:', err);
        }
      } finally {
        setSubmitting(false);
      }
  }});
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyBoardContainer}>
        <View>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <BaseTextInput
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <BaseTextInput
            placeholder="Password"
            secureTextEntry={true}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
        </View>
        <BaseButton onPress={formik.handleSubmit} text={"Login"} loading={formik.isSubmitting} />
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

export default Login;
