import { Image, ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';

import { images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="bg-mango-200 h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image 
            source={images.mango}
          />
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <Link 
              href="/pomo" 
              className='text-green font-psugar text-4xl'
            >
              Tap to load
            </Link>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}