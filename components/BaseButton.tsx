import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View} from 'react-native';

interface BaseButtonProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
  bgColor?: string;
}

export const BaseButton = ({ text, onPress, loading = false, bgColor = '#6200ee' }:BaseButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: bgColor }]} 
      disabled={loading}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {loading && <ActivityIndicator style={styles.loader} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginLeft: 10,
  }
});

