import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText, MotiImage } from 'moti';

const categories = [
  { name: 'All' },
  { name: 'Fruits'},
  { name: 'Meals'},
  { name: 'Pizza'},
];

const restaurants = [
  { name: 'Rose Garden Restaurant', cuisines: ['Burger', 'Chicken', 'Rice', 'Wings'], rating: 4.7, deliveryFee: 'Free', deliveryTime: '20 min', imageUrl: 'https://raw.githubusercontent.com/notft/Nasa_space_apps/refs/heads/main/app/home/h1.jpg' },
  { name: 'Rose Garden Restaurant', cuisines: ['Burger', 'Chicken', 'Rice', 'Wings'], rating: 4.7, deliveryFee: 'Free', deliveryTime: '20 min', imageUrl: 'https://raw.githubusercontent.com/notft/Nasa_space_apps/refs/heads/main/app/home/pngegg%20(2).png' },
  { name: 'Pizza Palace', cuisines: ['Pizza', 'Wings'], rating: 4.8, deliveryFee: '4.5 kms', deliveryTime: '30 min', imageUrl: 'https://raw.githubusercontent.com/notft/Nasa_space_apps/refs/heads/main/app/home/h1.jpg' },
];

/*
api res eg.

"resturant": {
  "name": '',
  "address": '',
  "ratings": '',
  "deliveryFee": '',
  "deliveryTime": '',
  "imageUrl": '',
}
*/
export default function Dashboard() {
  
  const [selectedCategory, setSelectedCategory] = useState('All');                
  useEffect(() => {
    async function fetchRes() {
      try {
        const response = await fetch(`endpoint`);
        const data = await response.json(); 
      } catch (error) {
        throw new Error('Failed to fetch Resturantsss');
      }
    }

    fetchRes();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      {/* <Image source={item.icon} style={styles.categoryIcon} /> */}
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurant = ({ item }) => (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.restaurantCard}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Restaurant')}>
      <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.cuisines}>{item.cuisines.join(' • ')}</Text>
        <View style={styles.restaurantInfo}>
          <View style={styles.infoItem}>
            <Feather name="star" size={16} color="#FFD700" />
            <Text style={styles.infoText}>{item.rating}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{item.deliveryFee}</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="clock" size={16} color="#000" />
            <Text style={styles.infoText}>{item.deliveryTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <MotiText
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.greeting}
          >
            Hey, Good Afternoon!
          </MotiText>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
              <Feather name="shopping-bag" size={24} color="#FFA500" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Add')} style={styles.iconButton}>
              <Feather name="plus-circle" size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Location, restaurants"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.restaurantsContainer}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <FlatList
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#999',
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#FFF0E0',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  restaurantsContainer: {
    flex: 1,
  },
  restaurantCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisines: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

