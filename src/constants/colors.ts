/**
 * Global Colors for Lychee App
 * Based on the "Fresh" color palette with natural food-inspired colors
 */

export const COLORS = {
  // Primary Colors
  LEMON: '#E1DC53', // Yellow - Lemons
  PASSATA: '#F16838', // Orange - Passata
  FRESH_LEAF: '#339551', // Green - Fresh Leaf
  MINTY: '#BEE0C7', // Light Green - Minty
  CREAM: '#F6F4DC', // Off-White - Cream
  BASIL: '#266533', // Dark Green - Basil

  // Semantic Colors
  PRIMARY: '#339551', // Fresh Leaf - Main app color
  SECONDARY: '#F16838', // Passata - Accent color
  SUCCESS: '#339551', // Fresh Leaf - Success
  ERROR: '#F16838', // Passata - Error states
  WARNING: '#E1DC53', // Lemon - Warnings
  INFO: '#BEE0C7', // Minty - Information
  BACKGROUND: '#F6F4DC', // Cream - Background

  // UI Elements
  BUTTON_PRIMARY: '#339551', // Fresh Leaf
  BUTTON_SECONDARY: '#F16838', // Passata
  BUTTON_DISABLED: '#BEE0C7', // Light green

  // Progress States
  PROGRESS_HIGH: '#339551', // Fresh Leaf (80-100%)
  PROGRESS_MEDIUM: '#E1DC53', // Lemon (50-79%)
  PROGRESS_LOW: '#F16838', // Passata (0-49%)

  // Text Colors
  TEXT_PRIMARY: '#266533', // Basil - Main text
  TEXT_SECONDARY: '#339551', // Fresh Leaf - Secondary text
  TEXT_LIGHT: '#F6F4DC', // Cream - Light text (on dark backgrounds)

  // Border Colors
  BORDER_LIGHT: '#BEE0C7', // Minty
  BORDER_DARK: '#339551', // Fresh Leaf
};

// Color variants with transparency
export const withAlpha = (color: string, opacity: number) => {
  // Convert hex to rgba
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(color);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : color;
};
