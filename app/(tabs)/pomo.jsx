import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';

import { icons } from "../../constants";

const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const Pomo = () => {
  const [work, setWork] = useState(WORK_TIME);
  const [shortBreak, setShortBreak] = useState(SHORT_BREAK);
  const [longBreak, setLongBreak] = useState(LONG_BREAK);
  
  const [active, setActive] = useState(true);

  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);
  const [sessionNumber, setSessionNumber] = useState(0);

  const [startBtn, setStartBtn] = useState(true);
  const [timerDiv, setTimerDiv] = useState(false);
  
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
    setStartBtn(false);
    setTimerDiv(true);
    setCount(work)
  }

  // Stop Session Timer
  const stopSession = () => {
    setStartBtn(true);
    setTimerDiv(false);
  }

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
    }
    if(count == 0 && (sessionNumber == 0 || sessionNumber == 2 || sessionNumber == 4 || sessionNumber == 6)) {
      setSessionNumber((prevCount) => prevCount + 1);
      setActive(true);
      setCount(work);
    }
    if(count == 0 && sessionNumber == 7) {
      setSessionNumber((prevCount) => prevCount - 7);
      setActive(false);
      setCount(longBreak);
    }
    return () => clearInterval(interval);
  }, [count, paused])

  // Pause
  const pause = () => {
    setPaused(!paused);
  }



  return (
    <SafeAreaView className="px-4 my-6 bg-mango-200 h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>

        <View className="w-full justify-center items-center h-full px-4">
          {/* Start Session */}
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <TouchableOpacity onPress={startSession}>
              {startBtn ? <Text className="text-2xl font-psugar text-green">Start Session</Text> : "" }
            </TouchableOpacity>
          </Animatable.View>

          {/* Work */}
          {timerDiv ?
          <View className="justify-center items-center">
            {active ? <Text className="font-psugar text-green text-4xl mb-6 text-center">Let's get some work done!</Text> : <Text className="font-psugar text-green text-2xl mb-6">Time for a break!</Text>}
            <Animatable.View animation="fadeIn" easing="ease-in" duration={2000}>
            <TouchableOpacity
              activeOpacity={.8}
              className="justify-center items-center border-4 rounded-full border-green h-60 w-60"
              onPress={pause}
            >
              <Image 
                source={paused ? icons.play : icons.pause}
                resizeMode='contain'
                className={`h20 w-20 justify-center items-center ${paused ? "ml-5" : "ml-0"}`}
                tintColor="#00bf63"
              />
            </TouchableOpacity>
            </Animatable.View>
            <Text className="font-psugar text-6xl text-green mt-6">{formatTime(count)}</Text>
            <TouchableOpacity 
              activeOpacity={.8}
              className="justify-center items-center border-4 border-green h-15 w-40 mt-16"
              onPress={stopSession}
            >
              <Text className="font-psugar text-green text-2xl">Stop Session</Text>
            </TouchableOpacity>
          </View>
          : "" }
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Pomo