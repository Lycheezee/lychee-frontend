import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, Text } from 'react-native-paper';
import { useState } from 'react';
import { styles } from './NumberInputField.style';
import { NumberInputFieldProps } from './NumberInputField.type';

export const NumberInputField = ({
  name = '',
  label,
  min,
  max,
  allowDecimals = true,
  decimalPlaces = 2,
  ...props
}: NumberInputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [displayValue, setDisplayValue] = useState('');

  const formatNumberInput = (input: string): string => {
    // Remove all non-numeric characters except decimal point
    let cleaned = input.replace(/[^0-9.]/g, '');

    // Handle decimal logic
    if (!allowDecimals) {
      cleaned = cleaned.replace(/\./g, '');
    } else {
      // Allow only one decimal point
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit decimal places
      if (parts.length === 2 && parts[1].length > decimalPlaces) {
        cleaned = parts[0] + '.' + parts[1].substring(0, decimalPlaces);
      }
    }

    return cleaned;
  };

  const validateNumber = (
    numberString: string
  ): { isValid: boolean; value?: number; message?: string } => {
    if (!numberString || numberString === '') {
      return { isValid: true, value: undefined };
    }

    const numValue = parseFloat(numberString);

    if (isNaN(numValue)) {
      return { isValid: false, message: 'Please enter a valid number' };
    }

    if (min !== undefined && numValue < min) {
      return {
        isValid: false,
        message: `Value must be at least ${min}`,
      };
    }

    if (max !== undefined && numValue > max) {
      return {
        isValid: false,
        message: `Value must be at most ${max}`,
      };
    }

    return { isValid: true, value: numValue };
  };

  const enforceMinMax = (value: number): number => {
    if (min !== undefined && value < min) return min;
    if (max !== undefined && value > max) return max;
    return value;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        const handleTextChange = (text: string) => {
          const formatted = formatNumberInput(text);
          setDisplayValue(formatted);

          // Validate the number
          const validation = validateNumber(formatted);
          if (validation.isValid && validation.value !== undefined) {
            // Enforce min/max constraints
            const constrainedValue = enforceMinMax(validation.value);
            onChange(constrainedValue);

            // Update display if value was constrained
            if (constrainedValue !== validation.value) {
              setDisplayValue(constrainedValue.toString());
            }
          } else if (formatted === '') {
            onChange('');
          }
          // If invalid number, don't update form value but allow display
        };

        const handleBlur = () => {
          onBlur();
          // Format the display value on blur if we have a valid form value
          if (value !== undefined && value !== '') {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(numValue)) {
              const formattedValue =
                allowDecimals && decimalPlaces > 0
                  ? numValue.toFixed(Math.min(decimalPlaces, 2))
                  : numValue.toString();
              setDisplayValue(formattedValue);
            }
          }
        };

        // Initialize display value from form value
        const currentDisplayValue =
          displayValue || (value !== undefined && value !== '' ? value.toString() : '');

        return (
          <>
            <TextInput
              label={label}
              mode="outlined"
              onBlur={handleBlur}
              onChangeText={handleTextChange}
              value={currentDisplayValue}
              style={styles.input}
              error={!!errors[name]}
              keyboardType={allowDecimals ? 'decimal-pad' : 'numeric'}
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
