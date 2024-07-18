import { Text, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Todo = () => {
  return (
    <SafeAreaView className="px-4 my-6 bg-mango-200 h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="font-psugar text-6xl text-green">coming soon!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Todo