import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import AccountNav from "../components/AccountNav";
import Plants from "../components/Plants";
import UserInfo from "../components/UserInfo";
import History from "../components/History";

export default function Account({token}) {
    const [ShowInfo, setShowInfo] = useState(true);
    const [ShowPlante, setShowPlante] = useState(false);
    const [ShowHisto, setShowHisto] = useState(false);

    return (
    <>
        <View style={styles.container}>
        <AccountNav 
        token = {token}
        onPressinfo={() => {setShowInfo(true); setShowPlante(false); setShowHisto(false)}} 
        onPressplante={() =>{setShowInfo(false); setShowPlante(true); setShowHisto(false)}}
        onPresshisto={() =>{setShowInfo(false); setShowPlante(false); setShowHisto(true)}}
        />
        {
            ShowInfo == true ?
            <View>
                <UserInfo token = {token}/>
            </View>
            :
            ShowPlante == true ?

            <>
            <Plants token = {token}/>
            </>
            :
            ShowHisto == true ?
            <>
            <History token = {token}/>
            </>
            :
            <View>
            </View>
        }
        </View>
</>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex:2,
    backgroundColor: '#ffffff'
  },
  });