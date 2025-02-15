import {React, useState} from 'react';
import {Text, View, StyleSheet,TextInput, SafeAreaView, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
const Add = () => {
const navigation = useNavigation();
navigation.setOptions({
        headerShown: false,
      });
      const [itemName, setItemName] = useState('');
      const [quantity, setQuantity] = useState('');
      const onChangeText = (e) => {
        setItemName(e);
      }
      const onChangeQuantity = (e) => {
        setQuantity(e);
      }
      const handleUploadPhoto = () => {
        fetch(`https:127.0.0.1:8000/api/upload`, {
          method: 'POST',
          body: createFormData(photo, { userId: '123' }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
      };
      const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
           console.log(response);
          if (response) {
            setPhoto(response);
          }
        });
      };
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.box}>
       
        <Text style={styles.heading}>Add items</Text>
        <View style={styles.inputCont}>
        <Text style={styles.label} aria-label="Label for item" nativeID="labelItem">Item Name</Text>
      <TextInput
          style={styles.input}
          aria-label="input"
          aria-labelledby="labelItem"
          onChangeText={onChangeText}
          value={itemName}
          placeholder='Enter Item Name'
        />
        </View>
        <View style={styles.inputCont}>
        <Text style={styles.label} aria-label="Label for Quanitity" nativeID="labelQuantity">Quantity</Text>
      <TextInput
          style={styles.input}
          aria-label="input"
          keyboardType='numeric'
          aria-labelledby="labelQuantity"
          onChangeText={onChangeQuantity}
          value={itemName}
          placeholder='Enter quantity'
        />
        </View>
        <View style={styles.inputCont}>
        <Text style={styles.label} aria-label="Label for upload" nativeID="labelUpload">Upload photo</Text>
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
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
}
});