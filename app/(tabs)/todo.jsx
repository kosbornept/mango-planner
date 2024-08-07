import { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Task from '../../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const TASK_KEY = "tasks";

const Todo = () => {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // clearAll();
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [taskList]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASK_KEY);
      if (storedTasks !== null) {
        setTaskList(JSON.parse(storedTasks));
          }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(TASK_KEY, JSON.stringify(taskList));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  // // Handle input
  const handleAdd = () => {
    Keyboard.dismiss();
    if(!task) {
      return;
    }
    setTaskList([...taskList, task]);
    saveTasks();
    setTask(null);
  }

  const completeTask = (i) => {
    let listCopy = [...taskList];
    listCopy.splice(i, 1);
    setTaskList(listCopy);
  } 

  // Reset
  // clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //   } catch(e) {
  //     // clear error
  //   }
  //   console.log('Done.')
  // }

  return (
    <SafeAreaView className="px-4 my-6 bg-mango-200 h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="w-full h-full px-4">
          <Text className="font-psugar text-center text-green text-3xl pt-6">To-do List!</Text>
          <View>
            {taskList.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Animatable.View animation="bounceIn" easing="ease-in">
                    <Task text={item} />
                  </Animatable.View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="flex flex-row gap-6 mb-10" behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TextInput placeholderTextColor="#00bf63" className="border-green border-2 w-8/12 p-2 font-pubuntu text-green placeholder-green" placeholder='Write your task' value={task} onChangeText={text => setTask(text)} />
            <TouchableOpacity className="border-green border-2 w-2/12 p-2 text-center justify-center items-center" onPress={() => handleAdd()}>
              <View>
                <Text className="font-psugar text-2xl text-green">+</Text>
              </View>
            </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Todo