import Swiper from "react-native-slick";
import { View } from "react-native";
import { FoodCard } from "./FoodCard";

const mockFood = {
  name: "Grilled Chicken Bowl",
  descriptions:
    "A healthy grilled chicken bowl with quinoa, avocado, and steamed vegetables.",
  images: ["https://example.com/images/grilled-chicken-bowl.jpg"],
  nutritions: {
    fats: 12,
    calories: 480,
    sugars: 5,
    proteins: 38,
    fibers: 6,
    sodium: 620,
    cholesterol: 85,
    waterIntake: 300,
  },
};

export const FoodCarousel = () => {
  return (
    <View>
      <Swiper
        showsPagination
        loop
        autoplay
        autoplayTimeout={3}
        // dotStyle={styles.dot}
        // activeDotStyle={styles.activeDot}
      >
        {Array(10)
          .fill(mockFood)
          .map((item, index) => (
            <FoodCard key={index} food={item} />
          ))}
      </Swiper>
    </View>
  );
};
