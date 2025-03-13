import { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text } from 'react-native';
import MyKeyboard from './src/components/MyKeyboard';

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
      <SafeAreaView>
        <MyKeyboard />
      </SafeAreaView>
  );
}
