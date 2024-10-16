import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {

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
        flex: 1,
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
    }
});

export default Cart;