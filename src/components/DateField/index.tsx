import { Controller, useFormContext } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Button as PaperButton, Modal, Portal } from 'react-native-paper';
import { useState } from 'react';
import { styles } from './DateField.style';
import { DateFieldProps } from './DateField.type';
import { SelectField } from '../SelectField';

export const DateField = ({
  name = '',
  label,
  placeholder,
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
  ...props
}: DateFieldProps) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const [showDatePicker, setShowDatePicker] = useState(false);
  // Generate options for years, months, and days
  const minYear = minimumDate.getFullYear();
  const maxYear = maximumDate.getFullYear();

  const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
    label: String(maxYear - i),
    value: maxYear - i,
  }));

  const monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const handleDateSelect = (
    year: number,
    month: number,
    day: number,
    onChange: (value: any) => void
  ) => {
    if (year && month && day) {
      const date = new Date(year, month - 1, day);
      onChange(date.toISOString().split('T')[0]); // YYYY-MM-DD format
      setShowDatePicker(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <PaperButton
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            contentStyle={{ justifyContent: 'flex-start' }}
            style={styles.button}>
            {value ? formatDate(value) : placeholder || label || 'Select date'}
          </PaperButton>

          <Portal>
            <Modal
              visible={showDatePicker}
              onDismiss={() => setShowDatePicker(false)}
              contentContainerStyle={{
                backgroundColor: 'white',
                padding: 20,
                margin: 20,
                borderRadius: 8,
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
                {label || 'Select Date'}
              </Text>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Year</Text>
                <SelectField
                  name={`${name}_year`}
                  options={yearOptions}
                  placeholder="Select year"
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Month</Text>
                <SelectField
                  name={`${name}_month`}
                  options={monthOptions}
                  placeholder="Select month"
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Day</Text>
                <SelectField name={`${name}_day`} options={dayOptions} placeholder="Select day" />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <PaperButton mode="outlined" onPress={() => setShowDatePicker(false)}>
                  Cancel
                </PaperButton>
                <PaperButton
                  mode="contained"
                  onPress={() => {
                    const year = watch(`${name}_year`);
                    const month = watch(`${name}_month`);
                    const day = watch(`${name}_day`);
                    handleDateSelect(year, month, day, onChange);
                  }}>
                  Select
                </PaperButton>
              </View>
            </Modal>
          </Portal>

          {errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
      )}
    />
  );
};
