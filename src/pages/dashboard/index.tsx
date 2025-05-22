import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles/dashboard.style";
import { DashboardHeader } from "./components/dasboard.header";
import { FormProvider, useForm } from "react-hook-form";
import { FoodCarousel } from "./components/foodCarousel";

export const Dashboard = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View>
          <DashboardHeader />

          <FoodCarousel />

          {/* Featured Item */}
          <View style={styles.featuredContainer}>
            <Image
              source={{ uri: "https://your-image-link-here.com" }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredInfo}>
              <Text style={styles.foodTitle}>Thai prawn & ginger noodles</Text>
              <TouchableOpacity style={styles.heartButton}>
                <Icon name="heart" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {["Noodles", "Seafood", "Desserts", "Vegetable"].map(
                (cat, idx) => (
                  <TouchableOpacity key={idx} style={styles.categoryItem}>
                    {/* You can put icons here */}
                    <Text style={styles.categoryText}>{cat}</Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </View>

          {/* Recommended */}
          <View style={styles.recommendedSection}>
            <View style={styles.recommendedHeader}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://your-image-link-here.com" }}
              style={styles.recommendedImage}
            />
          </View>
        </View>

        {/* Bottom Navigation (Placeholder) */}
        <View style={styles.bottomNav}>
          <Icon name="home" size={28} color="#00cba9" />
          <Icon name="heart-outline" size={28} color="#aaa" />
          <Icon name="person-outline" size={28} color="#aaa" />
        </View>
      </View>
    </FormProvider>
  );
};
