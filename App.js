import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GiaoDien1 from './GiaoDien/GiaoDien1'; 
import GiaoDien2 from './GiaoDien/GiaoDien2'; 
import GiaoDien3 from './GiaoDien/Giaodien3';
// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GiaoDien1">
        {/* Điều hướng đến màn hình Home */}
        <Stack.Screen 
          name="GiaoDien1" 
          component={GiaoDien1} 
          options={{ headerShown: false }} 
        />
        {/* Điều hướng đến màn hình 2 */}
        <Stack.Screen
        name="GiaoDien2"
        component={GiaoDien2}
        options={{headerShown:false}}
        />
        {/* Điều hướng đến màn hình 3 */}
        <Stack.Screen
        name='GiaoDien3'
        component={GiaoDien3}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
