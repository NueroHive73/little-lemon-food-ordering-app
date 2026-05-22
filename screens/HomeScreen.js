import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

const categories = [
  'Starters',
  'Mains',
  'Desserts',
  'Drinks',
];

const menuItems = [
  {
    id: '1',
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'Fresh vegetables, feta cheese and olives.',
    image: require('../assets/greeksalad.jpeg'),
    category: 'Starters',
  },

  {
    id: '2',
    title: 'Bruschetta',
    price: '$7.99',
    description:
      'Grilled bread with garlic and tomatoes.',
    image: require('../assets/bruschetta.jpeg'),
    category: 'Starters',
  },

  {
    id: '3',
    title: 'Grilled Fish',
    price: '$18.99',
    description:
      'Mediterranean grilled fish with herbs.',
    image: require('../assets/grilledfish.jpeg'),
    category: 'Mains',
  },

  {
    id: '4',
    title: 'Pasta',
    price: '$15.99',
    description:
      'Creamy pasta with parmesan cheese.',
    image: require('../assets/pasta.jpeg'),
    category: 'Mains',
  },

  {
    id: '5',
    title: 'Lemon Dessert',
    price: '$8.99',
    description:
      'Sweet lemon flavored dessert.',
    image: require('../assets/lemon_desert.jpeg'),
    category: 'Desserts',
  },

  {
    id: '6',
    title: 'Fresh Juice',
    price: '$4.99',
    description:
      'Freshly prepared fruit juice.',
    image: require('../assets/fresh_juice.jpeg'),
    category: 'Drinks',
  },
];


export default function HomeScreen({
  navigation,
}) {
  const [searchText, setSearchText] =
    useState('');

  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const filteredItems = menuItems.filter(
    (item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : item.category === selectedCategory;

      return (
        matchesSearch && matchesCategory
      );
    }
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.foodTitle}>
          {item.title}
        </Text>

        <Text style={styles.foodDescription}>
          {item.description}
        </Text>

        <Text style={styles.foodPrice}>
          {item.price}
        </Text>
      </View>

      <Image
        source={item.image}
        style={styles.foodImage}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            {/* HEADER */}

            <View style={styles.header}>
              <TouchableOpacity>
                <Text style={styles.menuIcon}>
                  ☰
                </Text>
              </TouchableOpacity>

              <Image
                source={require('../assets/logo.jpeg')}
                style={styles.logo}
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Profile')
                }
              >
                <Image
                  source={require('../assets/avatar.jpeg')}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>

            {/* HERO SECTION */}

            <View style={styles.hero}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>
                  Little Lemon
                </Text>

                <Text style={styles.heroSubtitle}>
                  Chicago
                </Text>

                <Text style={styles.heroDescription}>
                  We are a family owned
                  Mediterranean restaurant,
                  focused on traditional
                  recipes served with a modern
                  twist.
                </Text>
              </View>

              <Image
                source={require('../assets/hero.jpeg')}
                style={styles.heroImage}
              />
            </View>

            {/* SEARCH */}

            <TextInput
              placeholder="Search menu"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />

            {/* CATEGORIES */}

            <Text style={styles.sectionTitle}>
              ORDER FOR DELIVERY!
            </Text>

            <View style={styles.categoriesRow}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === 'All' &&
                    styles.activeCategory,
                ]}
                onPress={() =>
                  setSelectedCategory('All')
                }
              >
                <Text style={styles.categoryText}>
                  All
                </Text>
              </TouchableOpacity>

              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory ===
                      category &&
                      styles.activeCategory,
                  ]}
                  onPress={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  <Text
                    style={styles.categoryText}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }

        ListEmptyComponent={
        <Text style={{
            textAlign:'center',
            marginTop:40,
            fontSize:16
        }}>
            No menu items found
        </Text>
        }

      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  menuIcon: {
    fontSize: 28,
  },

  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  hero: {
    backgroundColor: '#495E57',
    flexDirection: 'row',
    padding: 20,
  },

  heroTitle: {
    color: '#F4CE14',
    fontSize: 32,
    fontWeight: '700',
  },

  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 22,
    marginBottom: 10,
  },

  heroDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingRight: 10,
  },

  heroImage: {
    width: 130,
    height: 130,
    borderRadius: 16,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 12,
    fontWeight: '700',
    fontSize: 16,
  },

  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  categoryButton: {
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  activeCategory: {
    backgroundColor: '#495E57',
  },

  categoryText: {
    color: '#333333',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardText: {
    flex: 1,
    paddingRight: 12,
  },

  foodTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },

  foodDescription: {
    color: '#666666',
    marginBottom: 10,
  },

  foodPrice: {
    fontWeight: '700',
    fontSize: 16,
  },

  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
});