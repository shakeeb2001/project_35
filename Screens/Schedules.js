import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Schedule" component={ScheduleScreen} />
    </Stack.Navigator>
  );
}

function ScheduleItem({ item, editMode, onEdit }) {
  const [time, setTime] = useState(item.time);
  const [date, setDate] = useState(item.date);
  const [subject, setSubject] = useState(item.subject);

  const handleTimeChange = (value) => {
    setTime(value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleEdit = () => {
    onEdit({ time, date, subject });
  };

  return (
    <View style={styles.item}>
      {editMode ? (
        <TextInput
          style={styles.input}
          onChangeText={handleTimeChange}
          value={time}
        />
      ) : (
        <Text style={styles.text}>{time}</Text>
      )}
      {editMode ? (
        <TextInput
          style={styles.input}
          onChangeText={handleDateChange}
          value={date}
        />
      ) : (
        <Text style={styles.text}>{date}</Text>
      )}
      {editMode ? (
        <TextInput
          style={styles.input}
          onChangeText={handleSubjectChange}
          value={subject}
        />
      ) : (
        <Text style={styles.text}>{subject}</Text>
      )}
    </View>
  );
}

export default function ScheduleScreen({route}) {
const { isLecturer } = route.params;
  
  const [editMode, setEditMode] = useState(false);
  const [schedule, setSchedule] = useState([
    { time: '9:00 AM - 11:00 AM', date: '14/05/2023', subject: 'SAD' },
    { time: '2:00 PM - 5:00 PM', date: '15/05/2023', subject: 'MAD' },
    { time: '9:00 PM - 11:00 PM', date: '17/05/2023', subject: 'IOT' },
  ]);

  const [timePeriod, setTimePeriod] = useState('2023-05-14 - 2023-05-20');

  const handleEditSchedule = (index, updatedItem) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = updatedItem;
    setSchedule(updatedSchedule);
  };

  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
      </View>
      
      <View style={styles.timePeriodContainer}>
        {editMode ? (
          <TextInput
            style={styles.timePeriodInput}
            onChangeText={handleTimePeriodChange}
            value={timePeriod}
          />
        ) : (
          <Text style={styles.timePeriodText}>{timePeriod}</Text>
        )}
      </View>
      <View style={styles.columnHeaders}>
        <Text style={styles.columnHeader}>Time</Text>
        <Text style={styles.columnHeader}>Date</Text>
        <Text style={styles.columnHeader}>Subject</Text>
      </View>
      {schedule.map((item, index) => (
        <ScheduleItem
          key={index}
          item={item}
          editMode={editMode}
          onEdit={(updatedItem) => handleEditSchedule(index, updatedItem)}
        />
      ))}
      {isLecturer && <TouchableOpacity
        onPress={() => setEditMode(!editMode)}
        style={styles.editButton}
      >
         <Text style={styles.editButtonText}>
          {editMode ? 'Save Schedule' : 'Edit Schedule'}
        </Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timePeriodContainer: {
    marginBottom: 20,
    backgroundColor: '#1C6758',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePeriodText: {
    fontSize: 18,
    color: 'white',
  },
  timePeriodInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    backgroundColor: 'white',
    height: 50,
  },
  columnHeaders: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    flex:0.28 ,
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,

  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#1C6758',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    alignSelf: 'center',
    shadowColor: '#023e8a',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: '',
    color: 'white',
    
  },
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 80,
    paddingTop: 40,
    paddingLeft : 140,
    marginTop : 0,

  },
});