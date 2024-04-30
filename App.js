import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [toDos, setToDos] = useState({});
  const [text, setText] = useState("");
  const [working, setWorking] = useState(true);
  useEffect(() => {
    loadToDos();
  }, [])
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  // const onChangeText = (event) => console.log(event);
  const onChangeText = (payload) => setText(payload);
  // console.log(text);
  const saveToDos = async(toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };

  const loadToDos = async() => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    // console.log(s, JSON.parse(s));
    setToDos(JSON.parse(s))
  }
  
  const addToDo = async() => {
    if(text === ""){
      return
    }
    // alert(text);
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            ) : null
            )
          )}
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