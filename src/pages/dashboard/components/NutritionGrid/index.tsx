import { View } from 'react-native';
import { NutrientCard } from '../NutrientCard';
import { Nutrition } from '~/types/nutritions';
import { NUTRITION_CARDS_CONFIG } from '~/constants/dashboard.constants';
import { getSafeNutritionValue } from '~/utils/nutritionCalculations';
import styles from '../../styles/dashboard.style';

interface NutritionGridProps {
  nutrition: Nutrition | null;
}

/**
 * Grid component that displays nutrition cards in a 2x3 layout
 * Each card shows a specific nutrition metric with proper formatting
 */
export const NutritionGrid: React.FC<NutritionGridProps> = ({ nutrition }) => {
  const nutritionCards = NUTRITION_CARDS_CONFIG;

  return (
    <View style={styles.nutrientsContainer}>
      {/* First Row */}
      <View style={styles.nutrientRow}>
        <NutrientCard
          label={nutritionCards[0].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[0].key,
            nutritionCards[0].fallback
          )}
        />
        <NutrientCard
          label={nutritionCards[1].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[1].key,
            nutritionCards[1].fallback
          )}
        />
      </View>

      {/* Second Row */}
      <View style={styles.nutrientRow}>
        <NutrientCard
          label={nutritionCards[2].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[2].key,
            nutritionCards[2].fallback
          )}
        />
        <NutrientCard
          label={nutritionCards[3].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[3].key,
            nutritionCards[3].fallback
          )}
        />
      </View>

      {/* Third Row */}
      <View style={styles.nutrientRow}>
        <NutrientCard
          label={nutritionCards[4].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[4].key,
            nutritionCards[4].fallback
          )}
        />
        <NutrientCard
          label={nutritionCards[5].label}
          value={getSafeNutritionValue(
            nutrition,
            nutritionCards[5].key,
            nutritionCards[5].fallback
          )}
        />
      </View>
    </View>
  );
};
