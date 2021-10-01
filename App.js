import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

//Build the to do list from object of items

// Definition of Interaction:
// List item will appear within text area on the page when
// user clicks button or presses enter

// Assets:
// List items from object

// Expected outcome: 
// Display list item on the screen and add to list.


export default function App() {
  const [itemCount, setItemCount] = useState(2);
  const [items, setItems] = useState({
    1: 'first item',
    2: 'second item',
  });
  const itemsArray = Object.entries(items);

  return (
    <View style={styles.container}>
        <ScrollView>
          {
            itemsArray.map((item, index) => {
              return (
                <View key={item[0]} id={item[0]}>
                  <Text>{item[1]}</Text>
                </View>
              );
            })
          }
        </ScrollView> 
        
        {/* Text Input with Button 
            Uses function that accepts user input task and adds to list
        */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
