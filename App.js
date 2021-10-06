import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, Button } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'first item'},
    {todo: 'second item'}
  ]);
  const [userInput, setUserInput] = useState('');

  const generateList = items.map((item, index) => (
      <View key={index}>
        <Text>{item.todo}</Text>
      </View>
    )
  );

  const showAlert = () => {
    console.log('SHOW ALERT');
    Alert.alert(
      'Invalid Task',
      'Please enter valid string',
      [{
        text: 'OK',
        style: 'cancel',
      }])
  };

  const addToList = () => {
    if (items == null) return;
    setItems([...items, {todo: textInput}]);
    setTextInput('');
  };

  const deleteFromList = () => {
    // ? something with setTasks filter ?
  };

  const verifyInput = () => {
    // if input is string
    // check for illegal characters too, regex?
    if (typeof textInput === 'string') addToList();
    else showAlert();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>To Do List</Text>
        <ScrollView style={styles.itemListContainer}>
          {generateList}
        </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.itemListInput}
        onChangeText={text => setUserInput(text)}
        onSubmitEditing={verifyInput}
        value = {userInput}
        placeholder='Type task here' />
        <Button
          title='Add to list' 
          onPress={verifyInput}/>
        <Button
          title='Clear input'
          onPress={() => setUserInput()}
          color='red'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appTitle: {
    fontSize: '30px',
    padding: 15,
  },
  itemListContainer: {
    width: '100%',
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemListInput: {
    height: 25,
    width: '100%',
    border: 'solid 1px',
    borderRadius: 5,
    lineHeight: '1em',
    padding: '0.5em',
    margin: 'auto',
  },
});
