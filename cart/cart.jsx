import React, { useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, Sen_400Regular } from '@expo-google-fonts/sen';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

const items = [
    { name: "Chooru morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
    { name: "Choorum morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
    { name: "Choorum morum", quantity: "1", img: "https://raw.githubusercontent.com/abin-karukappallil/Nasa_space_apps/refs/heads/main/app/cart/pngegg%20(6).png" },
];

const Cart = () => {
    const isMounted = useRef(true); // Track if component is mounted
    let [fontsLoaded] = useFonts({
        Sen_400Regular,
    });
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        
        return () => {
            isMounted.current = false; // Cleanup: set to false on unmount
        };
    }, [navigation]);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const renderCart = ({ item }) => (
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
            <View style={styles.AddressContainer}>
            <View style={styles.Address}>
                <View>

                    <Text style={{opacity: 0.5,color: 'black',}}>Pickup Address</Text>
                </View>
                <Text style={{color: 'black',marginTop: 10,fontWeight: '500',textTransform: 'uppercase'}}>St josephs college of engineering palai</Text>
            </View>
            <View style={styles.total}>
                <Text style={styles.totalText}>Total:  3</Text>
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
       // marginBottom: 20,
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
        fontSize: 16,
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
    }
});

export default Cart;
