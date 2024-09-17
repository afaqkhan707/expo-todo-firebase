import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth';
const Settings = () => {
    const user = auth().currentUser;
    return (
      <SafeAreaView style={{backgroundColor:"red",flex:1}}>
        <Text>Drawer</Text>
        <View>
        <Text>Welcome back back {user?.email}</Text>
        <Button title="Sign out" onPress={() => auth().signOut()} />
      </View>
      </SafeAreaView>
  )
}

export default Settings