import { ScrollView } from 'react-native';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="bg-mango-200 h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <Redirect href="/pomo" />
      </ScrollView>
    </SafeAreaView>
  );
}