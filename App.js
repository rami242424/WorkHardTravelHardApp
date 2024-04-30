import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,

} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [toDos, setToDos] = useState({});
  const [text, setText] = useState("");
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  // const onChangeText = (event) => console.log(event);
  const onChangeText = (payload) => setText(payload);
  // console.log(text);
  const addToDo = () => {
    if(text === ""){
      return
    }
    // alert(text);
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working },
    };
    setToDos(newToDos);
    setText("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}> 
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.gray }}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          returnKeyType="done"
          onSubmitEditing={addToDo}
          value={text}
          onChangeText={onChangeText}
          placeholderTextColor="#747474"
          placeholder={
            working ? "Add what you have to do.." : "Add where do you want to go"
          } 
          style={styles.input}
        />
        <ScrollView>{
          Object.keys(toDos).map(key => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ))
          }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,

  },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },

  btnText:{
    fontSize: 38,
    fontWeight: "600",
  },  

  input:{
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 20,
    fontSize: 16,

  },  

  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  toDoText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});