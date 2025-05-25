import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, Text } from 'react-native-paper';
import { useState } from 'react';
import moment from 'moment';
import { styles } from './DateField.style';
import { DateFieldProps } from './DateField.type';

export const DateField = ({
  name = '',
  label,
  placeholder = 'DD/MM/YYYY',
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
  ...props
}: DateFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [displayValue, setDisplayValue] = useState('');

  const formatDateInput = (input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');

    // Format as DD/MM/YYYY
    if (numbers.length >= 8) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    } else if (numbers.length >= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
    } else if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return numbers;
  };

  const validateDate = (
    dateString: string
  ): { isValid: boolean; date?: Date; message?: string } => {
    if (!dateString || dateString.length < 10) {
      return { isValid: false, message: 'Please enter a complete date' };
    }

    const parsed = moment(dateString, 'DD/MM/YYYY', true);

    if (!parsed.isValid()) {
      return { isValid: false, message: 'Please enter a valid date' };
    }

    const date = parsed.toDate();

    if (date < minimumDate) {
      return {
        isValid: false,
        message: `Date must be after ${moment(minimumDate).format('DD/MM/YYYY')}`,
      };
    }

    if (date > maximumDate) {
      return {
        isValid: false,
        message: `Date must be before ${moment(maximumDate).format('DD/MM/YYYY')}`,
      };
    }

    return { isValid: true, date };
  };

  const formatDisplayDate = (isoDate: string): string => {
    if (!isoDate) return '';
    return moment(isoDate).format('DD/MM/YYYY');
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        const handleTextChange = (text: string) => {
          const formatted = formatDateInput(text);
          setDisplayValue(formatted);

          // Validate and update form value only if complete and valid
          if (formatted.length === 10) {
            const validation = validateDate(formatted);
            if (validation.isValid && validation.date) {
              // Store in ISO format (YYYY-MM-DD) for form data
              onChange(validation.date.toISOString().split('T')[0]);
            } else {
              // Clear form value if invalid but keep display value
              onChange('');
            }
          } else {
            // Clear form value if incomplete
            onChange('');
          }
        };

        const handleBlur = () => {
          onBlur();
          // If we have a valid form value, update display to match
          if (value) {
            setDisplayValue(formatDisplayDate(value));
          }
        };

        // Initialize display value from form value
        const currentDisplayValue = displayValue || (value ? formatDisplayDate(value) : '');

        return (
          <>
            <TextInput
              label={label}
              mode="outlined"
              onBlur={handleBlur}
              onChangeText={handleTextChange}
              value={currentDisplayValue}
              placeholder={placeholder}
              style={styles.input}
              error={!!errors[name]}
              keyboardType="numeric"
              maxLength={10}
              right={<TextInput.Icon icon="calendar" />}
              {...props}
            />
            {errors[name] && (
              <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
            )}
          </>
        );
      }}
    />
  );
};
