import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#FFD9D9',
    borderRadius: 15,
    padding: 12,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#FFB6B6',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
});
