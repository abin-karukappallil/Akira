import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
   
    navigation.setOptions({
      headerShown: false,
    });

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image
        source={require('./assets/logo-no-background.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F1', 
  },
  logo: {
    width: 380,
    height: 400,
    marginBottom: 20,
  },
});

export default HomeScreen;