import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, withAlpha } from '../../../../constants/colors';

interface NutrientCardProps {
  label: string;
  value: number | string;
  unit?: string;
}

export const NutrientCard: React.FC<NutrientCardProps> = ({ label, value, unit = '' }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>
        {value}
        {unit ? ` ${unit}` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: withAlpha(COLORS.MINTY, 0.4),
    borderRadius: 15,
    padding: 12,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: COLORS.MINTY,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  label: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
});
