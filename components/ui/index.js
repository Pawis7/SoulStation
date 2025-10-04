import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export const Card = ({ children, style, onPress, ...props }) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  icon,
  style,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        disabled && styles.button_disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={[
        styles.buttonText,
        styles[`buttonText_${variant}`],
        styles[`buttonText_${size}`],
        disabled && styles.buttonText_disabled,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const Avatar = ({ 
  text, 
  size = 'medium', 
  backgroundColor,
  textColor = Colors.background.primary,
  style,
  ...props 
}) => {
  const avatarSize = {
    small: 32,
    medium: 40,
    large: 80,
  }[size];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: backgroundColor || Colors.primary,
        },
        style,
      ]}
      {...props}
    >
      <Text style={[
        styles.avatarText,
        {
          fontSize: avatarSize * 0.4,
          color: textColor,
        },
      ]}>
        {text}
      </Text>
    </View>
  );
};

export const IconButton = ({ 
  icon, 
  onPress, 
  size = 'medium',
  variant = 'ghost',
  style,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        styles[`iconButton_${variant}`],
        styles[`iconButton_${size}`],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Card styles
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.small,
  },

  // Button styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.base,
  },
  
  button_primary: {
    backgroundColor: Colors.primary,
  },
  
  button_secondary: {
    backgroundColor: Colors.background.tertiary,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
  
  button_ghost: {
    backgroundColor: 'transparent',
  },
  
  button_small: {
    paddingVertical: Spacing.sm,
    minHeight: 32,
  },
  
  button_medium: {
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  
  button_large: {
    paddingVertical: Spacing.base,
    minHeight: 52,
  },
  
  button_disabled: {
    opacity: 0.5,
  },
  
  buttonIcon: {
    marginRight: Spacing.sm,
  },
  
  buttonText: {
    fontWeight: Typography.weights.semibold,
    textAlign: 'center',
  },
  
  buttonText_primary: {
    color: Colors.background.primary,
    fontSize: Typography.sizes.base,
  },
  
  buttonText_secondary: {
    color: Colors.text.primary,
    fontSize: Typography.sizes.base,
  },
  
  buttonText_ghost: {
    color: Colors.primary,
    fontSize: Typography.sizes.base,
  },
  
  buttonText_small: {
    fontSize: Typography.sizes.sm,
  },
  
  buttonText_medium: {
    fontSize: Typography.sizes.base,
  },
  
  buttonText_large: {
    fontSize: Typography.sizes.md,
  },
  
  buttonText_disabled: {
    color: Colors.text.disabled,
  },

  // Avatar styles
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarText: {
    fontWeight: Typography.weights.bold,
  },

  // IconButton styles
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.base,
  },
  
  iconButton_ghost: {
    backgroundColor: 'transparent',
  },
  
  iconButton_filled: {
    backgroundColor: Colors.background.tertiary,
  },
  
  iconButton_small: {
    width: 32,
    height: 32,
    padding: Spacing.xs,
  },
  
  iconButton_medium: {
    width: 40,
    height: 40,
    padding: Spacing.sm,
  },
  
  iconButton_large: {
    width: 48,
    height: 48,
    padding: Spacing.md,
  },
});