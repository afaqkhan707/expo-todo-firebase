import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {

  return (
    <Drawer 
    screenOptions={{
      drawerPosition:"right"
    }}>
      <Drawer.Screen name="(tabs)" options={{headerShown:true}}/>
    </Drawer>
  );
}
