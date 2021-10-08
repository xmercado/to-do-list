import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, CheckBox, Button } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'first item'},
    {todo: 'second item'}
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChecked, setChecked] = useState(false);

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
    /^[a-zA-Z0-9- ]*$/.test(userInput))
    addToList();
    else showAlertInput();
  };

  const showItems = () => {
    console.log(items);
  }

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
        <View>
          <Button
            title='Add to list' 
            onPress={verifyInput}/>
        </View>
        <View>
          <Button
            title='Clear input'
            onPress={() => setUserInput()}
            color='red'/>
        </View>
        <View>
          <Button
            title='Show items'
            onPress={showItems}
            color='purple'/>
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
  deleteBox: {
    marginLeft: 10,
  }
});
