import { Text, ScrollView, View, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';
import { useKeepAwake } from 'expo-keep-awake';

import { icons } from "../../constants";

// Prod Timer
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

// Dev Timer
// const WORK_TIME = 3;
// const SHORT_BREAK = 2;
// const LONG_BREAK = 5;

const green = "#00bf63";
const mango = "#ffbd59";

const Pomo = () => {
  const [work, setWork] = useState(WORK_TIME);
  const [shortBreak, setShortBreak] = useState(SHORT_BREAK);
  const [longBreak, setLongBreak] = useState(LONG_BREAK);
  const [height, setHeight] = useState('50%');
  const [justify, setJustify] = useState('justify-start');
  const [modalVisable, setModalVisable] = useState(false);  
  const [active, setActive] = useState(true);
  const [paused, setPaused] = useState(true);
  const [count, setCount] = useState(0);
  const [sessionNumber, setSessionNumber] = useState(0);
  const [startBtn, setStartBtn] = useState(true);
  const [timerDiv, setTimerDiv] = useState(false);
  const [color, setColour] = useState(green);
  const [bg, setBg] = useState(mango);


  // Convert to Clock
  const formatTime = (seconds) => {
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;
    let ret = "";
    if(hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }

  // Start Session Timer
  const startSession = () => {
    setPaused(false);
    setStartBtn(false);
    setTimerDiv(true);
    setCount(work);
    setHeight('100%');
    setJustify('justify-center');
  }

  // Stop Session Timer
  const stopSession = () => {
    if(paused === true) {
      setPaused(false);
    }
    setSessionNumber(0);
    setActive(true);
    setCount(0);
    setColour(green);
    setBg(mango);
    setStartBtn(true);
    setTimerDiv(false);
    setHeight('50%');
    setJustify('justify-start');
    setPaused(true);
  }

  // Add Minutes
  const addTime = () => {
    setCount((prevCount) => prevCount + 300);
  }

  // Keep Screen Awake During Session
  useKeepAwake();

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if(paused === true) {
        return;
      }
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if(count == 0 && (sessionNumber == 1 || sessionNumber == 3 || sessionNumber == 5)) {
      setSessionNumber((prevCount) => prevCount + 1);
      setActive(false);
      setCount(shortBreak);
      setColour(mango);
      setBg(green);
    }
    if(count == 0 && (sessionNumber == 0 || sessionNumber == 2 || sessionNumber == 4 || sessionNumber == 6)) {
      setSessionNumber((prevCount) => prevCount + 1);
      setActive(true);
      setCount(work);
      setColour(green);
      setBg(mango);
    }
    if(count == 0 && sessionNumber == 7) {
      setSessionNumber((prevCount) => prevCount - 7);
      setActive(false);
      setCount(longBreak);
      setColour(mango);
      setBg(green);
    }
    return () => clearInterval(interval);
  }, [count, paused])

  // Pause
  const pause = () => {
    setPaused(!paused);
  }

  return (
    <SafeAreaView className="px-4 my-6 h-full" style={{backgroundColor: `${bg}`}}>
      {startBtn ? <ScrollView contentContainerStyle={{ height: '50%' }}>
        <View className="w-full justify-end items-end">
          <TouchableOpacity
            onPress={() => setModalVisable(true)}
          >
            <Image 
              source={icons.settings}
              resizeMode='contain'
              className="h-10 w-10"
              tintColor="#00bf63"
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisable}
          onRequestClose={() => setModalVisable(!modalVisable)}
          onDismiss={() => setModalVisable(!modalVisable)}
        >
          <View className="bg-green p-6 items-center justify-between m-auto w-10/12 h-3/6">
            <Text className="text-mango-100 text-2xl font-psugar">Session Timer Settings</Text>
            <View className="gap-6">
                <TextInput 
                  onChangeText={(e) => setWork(e * 60)}
                  defaultValue={work}
                  placeholder="Work Time in Minutes"
                  placeholderTextColor="#fec81d"
                  keyboardType='numeric'
                  className="text-mango-100 placeholder-mango-100 border-mango-100 border-2 p-2 font-psugar text-center"
                />
                <TextInput 
                  onChangeText={(e) => setShortBreak(e * 60)}
                  defaultValue={shortBreak}
                  placeholder="Short break in Minutes"
                  placeholderTextColor="#fec81d"
                  keyboardType='numeric'
                  className="text-mango-100 placeholder-mango-100 border-mango-100 border-2 p-2 font-psugar text-center"
                />
                <TextInput 
                  onChangeText={(e) => setLongBreak(e * 60)}
                  defaultValue={longBreak}
                  placeholder="Long Break in Minutes"
                  placeholderTextColor="#fec81d"
                  keyboardType='numeric'
                  className="text-mango-100 placeholder-mango-100 border-mango-100 border-2 p-2 font-psugar text-center"
                />
              </View>
            <TouchableOpacity>
              <Text onPress={() => setModalVisable(!modalVisable)} className="text-mango-100 text-xl border-mango-100 border-2 p-2 text-center font-psugar">Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView> : "" }
      <ScrollView contentContainerStyle={{ height: height }}>
        <View className={`w-full ${justify} items-center h-full px-4`}>
          {/* Start Session */}
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <TouchableOpacity onPress={startSession}>
              {startBtn ? <Text className="text-2xl font-psugar" style={{color: `${color}`}}>Start Session</Text> : "" }
            </TouchableOpacity>
          </Animatable.View>
          {startBtn ? <Text className="text-l pt-6 text-center font-pubuntu" style={{color: `${color}`}}>Remember to turn off your notifications for maximum effect!</Text> : ""}
          {/* Work */}
          {timerDiv ?
          <View className="justify-center items-center">
            {active ? <Text className="font-psugar text-4xl mb-6 text-center" style={{color: `${color}`}}>Let's get some work done!</Text> : <Text className="font-psugar text-4xl mb-6" style={{color: `${color}`}}>Time for a break!</Text>}
            <Animatable.View animation="fadeIn" easing="ease-in" duration={2000}>
            <TouchableOpacity
              activeOpacity={.8}
              className="justify-center items-center border-4 rounded-full h-60 w-60"
              style={{borderColor: `${color}`}}
              onPress={pause}
            >
              {active ? <Image 
                source={paused ? icons.play : icons.pause}
                resizeMode='contain'
                className={`h20 w-20 justify-center items-center ${paused ? "ml-5" : "ml-0"}`}
                tintColor="#00bf63"
              /> : <Image 
              source={paused ? icons.play : icons.pause}
              resizeMode='contain'
              className={`h20 w-20 justify-center items-center ${paused ? "ml-5" : "ml-0"}`}
              tintColor="#ffbd59"
            />}
            </TouchableOpacity>
            </Animatable.View>
            <Text className="font-psugar text-6xl mt-6" style={{color: `${color}`}}>{formatTime(count)}</Text>
            <TouchableOpacity 
              activeOpacity={.8}
              className="justify-center items-center border-4 h-15 w-40 mt-16"
              style={{borderColor: `${color}`}}
              onPress={stopSession}
            >
              <Text className="font-psugar text-2xl" style={{color: `${color}`}}>Stop Session</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={.8}
              className="justify-center items-center border-4 h-15 w-40 mt-6"
              style={{borderColor: `${color}`}}
              onPress={addTime}
            >
              <Text className="font-psugar text-2xl" style={{color: `${color}`}}>Add 5mins</Text>
            </TouchableOpacity>
          </View>
          : "" }
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Pomo