import { Alert, StatusBar } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App(){
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(() => { 
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave) )
  }
  const loadToDos = async () => {
   const s = await AsyncStorage.getItem(STORAGE_KEY);
  //  console.log(s);
  // console.log(s, JSON.parse(s));
  setToDos(JSON.parse(s));

  }
  
  const addToDo = async () => {
    if(text === ""){
      return
    }
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()] : {text, working},
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  // console.log(toDos);
  const deleteToDo = async (key) => {
    Alert.alert(
      "Delete To Do?", 
      "Are you sure?", [
      {text: "Cancel"},
      {text: "I'm sure", onPress: () => {
        const newToDos = {...toDos}
        delete newToDos[key] 
        setToDos(newToDos);
        saveToDos(newToDos);
      }
      },
    ]);
    return;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text 
            style={{...styles.btnText, color: working ? "white" : theme.gray}}
          >
            Work
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text 
            style={{...styles.btnText, color: !working ? "white" : theme.gray}}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          style={styles.input}
        />
      </View>
      <ScrollView>{
        Object.keys(toDos).map((key) => (
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color="white"/>
              </TouchableOpacity>
            </View> 
          ) : null
        ))}
      </ScrollView>
    </View>
  );
}


        {/* <TouchableHighlight 
          underlayColor="red"
          onPress={() => console.log("pressed")}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight> */}
        {/* <TouchableWithoutFeedback        
          underlayColor="red"
          onPress={() => console.log("pressed")}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback> */}

const styles = StyleSheet.create ({
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

  btnText: {
    fontSize: 38 ,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },

  toDo: {
    backgroundColor: theme.gray,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})