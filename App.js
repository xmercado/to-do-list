import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, CheckBox, Button } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'first item'},
    {todo: 'second item'},
    {todo: 'third item'},
    {todo: 'fourth item'},
    {todo: 'fifth item'},
    {todo: 'sixth item'},
    {todo: 'seventh item'},
    {todo: 'eighth item'},
    {todo: 'ninth item'},
    {todo: 'tenth item'},
    {todo: 'eleventh item'},
    {todo: 'twelfth item'},
  ]);
  const [userInput, setUserInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [alertInput, setAlertInput] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateList = items.map((item, index) => (
      <View style={styles.taskContainer} key={index}>
        <Text>{item.todo}</Text>
        <CheckBox
          key={index}
          style={styles.deleteBox}
          value={index === selectedIndex ? true : false}
          onValueChange={() => changeDeleteState(index)}/>
      </View>
    )
  );

  const changeDeleteState = (index) => {
    setSelectedIndex(index);
    setAlertDelete(true);
  };

  const uncheckBox = () => {
    setAlertDelete(!alertDelete);
    setSelectedIndex(-1);
  };

  const displayDialogInput = () => (
    <View style={styles.dialogContainer}>
    <View style={styles.dialog}>
      <Text>{errorMessage}</Text>
      <Text>Please enter valid task.</Text>
      <View style={styles.buttonActions}>
        <Button
          title='OK'
          onPress={() => setAlertInput(!alertInput)}
        />
      </View>
    </View>
  </View>
  );

  const displayDialogDelete = () => (
    <View style={styles.dialogContainer}>
    <View style={styles.dialog}>
      <Text>Are you sure you would like to delete this task?</Text>
      <Text>{userInput}</Text>
      <View style={styles.buttonActions}>
        <Button
          title='Yes'
          onPress={() => deleteFromList()}
          color='red' />
        <Button
          title='No'
          onPress={() => uncheckBox()} />
      </View>
    </View>
  </View>
  );

  const addToList = () => {
    setItems([...items, {todo: userInput}]);
    setUserInput('');
  };

  const deleteFromList = () => {
    setItems(items.filter((value, index) => index != selectedIndex));
    setAlertDelete(!alertDelete);
    setSelectedIndex(-1);
  };

  const checkDuplicate = () => {
    const cleanInput = userInput.trim().toLowerCase();
    if (items.every((item) => item.todo !== cleanInput)) {
      return true;
    }
    return false;
  };

  const verifyInput = () => {
    // src: https://stackoverflow.com/questions/13840143/jquery-check-if-special-characters-exists-in-string
    if (!(userInput.length > 0) || !(/\S/.test(userInput))) {
        setErrorMessage('Task cannot be empty.');
        setAlertInput(!alertInput);
    }
    else if (!(checkDuplicate())) {
        setErrorMessage('Task already exists.');
        setAlertInput(!alertInput);
    }
    else if (!(/^[a-zA-Z0-9- ]*$/.test(userInput))) {
        setErrorMessage('Task can only be alphanumeric.');
        setAlertInput(!alertInput);
    }
    else addToList();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>To Do List</Text>
      <View style={styles.itemListContainer}>
        <ScrollView>
          {generateList}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.itemListInput}
          onChangeText={text => setUserInput(text)}
          onSubmitEditing={verifyInput}
          value = {userInput}
          placeholder='Enter task here' />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Add to list' 
          onPress={verifyInput}/>
        <View style={styles.spacing} />
        <Button
          title='Clear input'
          onPress={() => setUserInput('')}
          color='red'/>
      </View>
      { alertDelete
        ? displayDialogDelete()
        : null}
      { alertInput
        ? displayDialogInput()
        : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: '100%',
  },
  appTitle: {
    fontSize: '30px',
    padding: 10,
  },
  itemListContainer: {
    flexGrow: 1,
    width: '100%',
    height: 300,
    padding: 10,
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
  inputContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  spacing: {
    width: 10,
  },
  deleteBox: {
    marginHorizontal: 10,
  },

  dialogContainer : {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    border: 'solid 1px #000',
    margin: '0 auto',
    borderRadius: 5,
    padding: 30,
    backgroundColor: '#FFF',
  },
  buttonActions : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
});
