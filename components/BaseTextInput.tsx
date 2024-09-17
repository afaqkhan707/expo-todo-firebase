import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BaseTextInputProps  {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onBlur?:  ((e: any) => void) | undefined;
  secureTextEntry?:boolean;
}

export const BaseTextInput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  ...rest
}: BaseTextInputProps) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...rest} 
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry}>
          <Ionicons
            name={isSecure ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

