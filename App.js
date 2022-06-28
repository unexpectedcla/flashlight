import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity,} from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

const App = ()=>{
  const [toggle, setToggle] = useState(false);

  const changeToggle = () => setToggle(oldToggle => !oldToggle);

  //Ligar/desligar lanterna ao tocar
  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);
  
  //Ligar/desligar lanterna ao balançar
  useEffect(() => {
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });

    return () => subscription.remove();
  }, [toggle]);


  return  (<View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity 
          onPress={changeToggle}>
      <Image  
        style={toggle ? style.lightOn : style.lightOff}
        source={
          toggle ?
          require("./assets/icons/eco-light.png"):
          require("./assets/icons/eco-light-off.png")}
      />
      </TouchableOpacity>
    </View>);
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  containerLight: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  lightOn:{
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },

  lightOff:{
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  }, 


});