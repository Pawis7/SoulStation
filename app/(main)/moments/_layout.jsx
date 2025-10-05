import { Stack } from 'expo-router';
import { useTheme } from '../../../src/context/ThemeContext';

export default function MomentsLayout() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.secondary },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Moments',
        }} 
      />
      <Stack.Screen 
        name="detail" 
        options={{
          title: 'Moment Detail',
        }} 
      />
      <Stack.Screen 
        name="create" 
        options={{
          title: 'Create Moment',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="edit" 
        options={{
          title: 'Edit Moment',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}