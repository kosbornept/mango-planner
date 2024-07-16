import { Image, Text, View } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
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
            backgroundColor: '#fabc5c',
            borderTopWidth: 2,
            borderTopColor: '#00bf63',
            height: 84
          }
        }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
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
            )
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
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout