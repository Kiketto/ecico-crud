import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import imagesList from './screens/imagesList';
import createImageScreen from './screens/createImageScreen';
import imageDetailScreen from './screens/imageDetailScreen';

function MyStack(){
  return(
    <Stack.Navigator>
      
      <Stack.Screen name="createImageScreen" component={createImageScreen}></Stack.Screen>
      <Stack.Screen name="imagesList" component={imagesList}></Stack.Screen>
      <Stack.Screen name="imageDetailScreen" component={imageDetailScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
