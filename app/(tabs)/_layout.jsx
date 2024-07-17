import { Image, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router'

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-pubuntubold" : "font-pubuntu"} text-xs`} style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00bf63',
          tabBarInactiveTintColor: '#7C807C',
          tabBarStyle: {
            backgroundColor: '#ffbd59',
            height: 84,
            borderTopWidth: 2,
            borderTopColor: "#00bf63"
          }
        }}
      >
        <Tabs.Screen 
          name='pomo'
          options={{
            title: "Pomo",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.clock}
                color={color}
                name="Pomo"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen 
          name='todo'
          options={{
            title: "Todo",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.list}
                color={color}
                name="Todo"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#ffbd59" style="light" />
    </>
  )
}

export default TabsLayout