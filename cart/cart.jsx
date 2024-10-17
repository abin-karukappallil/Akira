import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, Sen_400Regular } from '@expo-google-fonts/sen';
import AppLoading from 'expo-app-loading';

const items = [
    { name: "Chooru morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
    { name: "Choorum morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
    { name: "Choorum morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
];

const Cart = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Sen_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const renderCart = ({ item }) => {
        return (
            <View style={styles.cartContainer}>
                <View style={styles.cartImgV}>
                    <Image source={{ uri: item.img }} style={styles.cartItems} />
                </View>
                <View style={styles.cartAlgn}>
                    <Text style={styles.cartText}>{item.name}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity>
                            <Icon name="minus" size={14} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.cartQuantity}>{item.quantity}</Text>
                        <TouchableOpacity>
                            <Icon name="plus" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headBlock}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backIcon}
                            source={{
                                uri: 'https://raw.githubusercontent.com/abin-karukappallil/Akira/refs/heads/dash/assets/Back.png',
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headText}>Cart</Text>
                </View>
            </View>
            <FlatList
                data={items}
                renderItem={renderCart}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121223',
        padding: 10,
    },
    headBlock: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 15,
        marginLeft: 20,
    },
    backIcon: {
        height: 30,
        width: 30,
    },
    headText: {
        color: 'white',
        fontSize: 23,
        fontWeight: '100',
        marginLeft: 20,
    },
    flatListContent: {
        paddingBottom: 20,
        paddingLeft: 10,
    },
    cartContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    cartImgV: {
        marginRight: 20,
    },
    cartItems: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        width: 120,
        height: 120,
    },
    cartText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Sen_400Regular',  
    },
    quantityContainer: {
        position: 'absolute',
        bottom: -25,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartQuantity: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10,
    },
    cartAlgn: {
      flex: 1,
      flexDirection: "row",
        
          }
});

export default Cart;
