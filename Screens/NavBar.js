import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Materials from "./Materials";
import Schedules from "./Schedules";
import Marks from "./Marks";
import Signout from "./Signout";

const Tab = createBottomTabNavigator();

export default function NavBar ({route}) {
  const { isLecturer } = route.params;
  console.log("isLecturer", isLecturer);
  const navigation = useNavigation();

  const handleNavigateMaterial = () => {
    navigation.navigate("Material", {
      isLecturer: isLecturer
    });
  };


  const handleNavigateSchedule = () => {
    navigation.navigate("Schedule", {
      isLecturer: isLecturer
    });
  };

  const handleNavigateMarks = () => {
    navigation.navigate("Marks", {
      isLecturer: isLecturer
    });
  };

  const signOut = () => {
    navigation.navigate("Login", {
      isLecturer: isLecturer
    });
  };

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 80,
      backgroundColor: "black"
    }
  };

  return (

    
    <Tab.Navigator screenOptions={screenOptions}>
     <Tab.Screen
          name="Materials"
          component={Materials}
          initialParams={{ isLecturer : isLecturer }}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <AntDesign name="book" size={24} color="white" />
                  <Text style={{ fontSize: 12, color: "white" }}>Materials</Text>
                  <TouchableOpacity  onPress={handleNavigateMaterial}>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />

      <Tab.Screen
        name="Schedules"
        component={Schedules}
        initialParams={{ isLecturer : isLecturer }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="schedule" size={24} color="white" />
                <Text style={{ fontSize: 12, color: "white" }}>Schedules</Text>
                <TouchableOpacity  onPress={handleNavigateSchedule}>
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Marks"
        component={Marks}
        initialParams={{ isLecturer : isLecturer }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Foundation name="results" size={24} color="white" />
                <Text style={{ fontSize: 12, color: "white" }}>Marks</Text>
                <TouchableOpacity  onPress={handleNavigateMarks}>
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Signout"
        component={Signout}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome name="sign-out" size={24} color="white" />
                <Text style={{ fontSize: 12, color: "white" }}>Sign-Out</Text>
                <TouchableOpacity  onPress={signOut}>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};


