import React, { useState, setState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, CheckBox, Button, Modal } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'first item'},
    {todo: 'second item'}
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const generateList = items.map((item, index) => (
      <View style={styles.taskContainer} key={index}>
        <Text>{item.todo}</Text>
        <CheckBox
          key={index}
          style={styles.deleteBox}
          value={isChecked}
          // cannot test showAlertDelete, use deleteFromList
          onValueChange={() => deleteFromList(index)}/>
      </View>
    )
  );

  const customAlertInput = () => (
    <View>
      <Modal
        styles={styles.modalView}
        visible={popUp}
        transparent={true}
        onRequestClose={() => setPopUp(!popUp)}>
        <View>
          <Text>Invalid Task</Text>
          <Text>Please enter valid string</Text>
          <Button
            title='OK'
            onPress={() => setPopUp(!popUp)} />
        </View>
      </Modal>
    </View>
  );

  const customAlertDelete = () => (
    <View>
      <Modal
        styles={styles.modalView}
        visible={popUp}
        transparent={true}
        onRequestClose={() => setPopUp(!popUp)}>
        <Text>Delete Task</Text>
        <Text>Are you sure you would like to delete this task?</Text>
        <Button
          title='Yes'
          onPress={() => deleteFromList(task)} />
        <Button
          title='No'
          onPress={() => setPopUp(!popUp)} />
      </Modal>
    </View>
  );

  // build view with confirm, cancel instead
  const showAlertInput = () => {
    // /!\ alert not on web /!\
    console.log('SHOW ALERT INPUT');
    Alert.alert(
      'Invalid Task',
      'Please enter valid string',
      [{
        text: 'OK',
        style: 'cancel',
      }])
  };

  const showAlertDelete = (task) => {
    // /!\ alert not on web /!\
    console.log('SHOW ALERT DELETE');
    Alert.alert(
      'Delete',
      'Are you sure you would like to delete this task?',
      [{
        text: 'Yes',
        onPress: () => deleteFromList(task),
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ])
  };

  const addToList = () => {
    if (items == null) return;
    setItems([...items, {todo: userInput}]);
    setUserInput('');
  };

  const deleteFromList = (task) => {
    setItems(items.filter((value, index) => index != task));
  };

  const verifyInput = () => {
    // src: https://stackoverflow.com/questions/13840143/jquery-check-if-special-characters-exists-in-string
    if (typeof userInput === 'string' &&
        userInput.length > 0 &&
        /^[a-zA-Z0-9- ]*$/.test(userInput))
      addToList();
      // showAlertInput
    else customAlertInput();
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
        <View styles={styles.button}>
          <Button
            title='Add to list' 
            onPress={verifyInput}/>
        </View>
        <View styles={styles.button}>
          <Button
            title='Clear input'
            onPress={() => setUserInput('')}
            color='red'/>
        </View>
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
    padding: 10,
  },
  itemListContainer: {
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  button: {
    alignSelf: 'center',
  },
  deleteBox: {
    marginLeft: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
