import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);

  navigation.setOptions({ headerShown: false });

  const handleChoosePhoto = () => {
    launchImageLibrary({ 
      mediaType: 'photo',
      includeBase64: false,
    }, (response) => {
      if (response.didCancel) return;
      if (response.error) {
        console.error('ImagePicker Error: ', response.error);
        return;
      }
      setPhoto(response);
    });
  };

  const handleUploadPhoto = async () => {
    if (!photo) {
      console.log('No photo selected');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Create form data
      const formData = new FormData();
      formData.append('file', {
        name: photo.assets[0].fileName,
        type: photo.assets[0].type,
        uri: photo.assets[0].uri,
      });

      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Upload success:', data);
      
      // Clear the form
      setPhoto(null);
      setItemName('');
      setQuantity('');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.box}>
        <Text style={styles.heading}>Add items</Text>
        
        <View style={styles.inputCont}>
          <Text style={styles.label} aria-label="Label for item" nativeID="labelItem">
            Item Name
          </Text>
          <TextInput
            style={styles.input}
            aria-label="input"
            aria-labelledby="labelItem"
            onChangeText={setItemName}
            value={itemName}
            placeholder='Enter Item Name'
          />
        </View>

        <View style={styles.inputCont}>
          <Text style={styles.label} aria-label="Label for Quantity" nativeID="labelQuantity">
            Quantity
          </Text>
          <TextInput
            style={styles.input}
            aria-label="input"
            keyboardType='numeric'
            aria-labelledby="labelQuantity"
            onChangeText={setQuantity}
            value={quantity}
            placeholder='Enter quantity'
          />
        </View>

        <View style={styles.inputCont}>
          <Text style={styles.label} aria-label="Label for upload" nativeID="labelUpload">
            Upload photo
          </Text>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.buttonContainer}>
            <Text style={styles.button}>Choose Photo</Text>
          </TouchableOpacity>
          {photo && (
            <TouchableOpacity onPress={handleUploadPhoto} style={styles.buttonContainer}>
              <Text style={styles.button}>Upload Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Add;
const styles = StyleSheet.create({
box: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#1E1E1E',
},
SafeAreaView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 13,
    paddingTop: 70,
},
input: {
    height: 40,
    margin: 12,
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontSize: 16,
    width: '90%',
    borderRadius: 10,
},
heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
},
inputCont: {
    justifyContent: 'center',
    alignItems: 'start',

},
label: {
    paddingLeft: 14,
    fontSize: 17,
    fontWeight: 500,
    color: 'white',
},
button: {
    backgroundColor: '#f0f0f0',
    width: '40%',
    height: 40,
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
}
});