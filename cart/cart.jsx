import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, Sen_400Regular } from '@expo-google-fonts/sen';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const [cartData, setCartData] = useState({});
    const isMounted = useRef(true);
    let [fontsLoaded] = useFonts({
        Sen_400Regular,
    });
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        const fetchCartData = async () => {
            try {
                const response = await fetch('https://akira.free.beeceptor.com/cart');
   const result = await response.json();

                if (result.status === 'success') {
                    setCartData(result.data);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();

        return () => {
            isMounted.current = false; 
        };
    }, [navigation]);

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const renderCartItem = (key, item) => (
        <View key={key} style={styles.cartContainer}>
            <View style={styles.cartImgV}>
                <Image source={{ uri: item.img }}  resizeMode="cover" style={styles.cartItems} />
            </View>
            <View style={styles.cartAlgn}>
                <Text style={styles.cartText}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity>
                        {/* <Icon name="minus" size={14} color="white" /> */}
                    </TouchableOpacity>
                    <Text style={styles.cartQuantity}>Quantity: 1</Text>
                    <TouchableOpacity>
                        {/* <Icon name="plus" size={14} color="white" /> */}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

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
            <ScrollView contentContainerStyle={styles.flatListContent}>
                {Object.keys(cartData).map((key) => renderCartItem(key, cartData[key]))}
            </ScrollView>
            <View style={styles.AddressContainer}>
                <View style={styles.Address}>
                    <Text style={{ opacity: 0.5, color: 'black' }}>Pickup Address</Text>
                    <Text style={styles.addressText}>
                        St josephs college of engineering palai
                    </Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalText}>Total: {Object.keys(cartData).length}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.placeButton}>
                        <Text style={styles.placeText}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121223',
        padding: 10,
        paddingTop: 30,
    },
    headBlock: {
       marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 15,
        marginLeft: 0,
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
        fontSize: 12,
        marginHorizontal: 10,
    },
    cartAlgn: {
        flex: 1,
        flexDirection: "row",
    },
    Address: {
        backgroundColor: '#F0F5FA',
        padding: 10,
        borderRadius: 10,
        minHeight: '40%',
        minWidth: '50%',
    },
    AddressContainer: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 0,
        bottom: 0,
        width: 400,
        paddingLeft: 10,
        height: 200,
        paddingTop: 20,
        paddingRight: 18,
    },
    placeButton:{
        flex: 0,
        padding: 10,
        marginTop: 39,
        borderRadius: 10,
        left: 60,
        backgroundColor: '#FF7622',
        alignItems: 'center',
        width: 250,
        justifyContent: 'center',
    },
    placeText: {
        color: 'white',
        fontSize: 15,
    },
    total: {
       position: 'absolute',
       top: 105,
       left: 20,
    },
    totalText:{
        opacity: 0.4,
        fontSize: 17,
        textTransform: 'uppercase',
    },
    addressText: {
        paddingTop: 5,
        fontWeight: "600",
        textTransform: 'uppercase',
    }
});

export default Cart;