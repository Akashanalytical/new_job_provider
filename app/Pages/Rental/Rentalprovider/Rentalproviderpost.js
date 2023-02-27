//import liraries
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

// create a component
export default function Rentalproviderpost({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            Rent Product
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 20,
            // alignItems: "center",
            // alignContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Rent")}>
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              style={{
                height: 42,
                width: 320,
                borderRadius: 10,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                Add Your first Rental product
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              style={{
                height: 42,
                width: 160,
                borderRadius: 10,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                Shorttime Job
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginVertical: 30,
        }}
      >
        <Text></Text>
        <Image
          style={{
            height: "50%",
            width: "100%",

            resizeMode: "contain",
          }}
          source={require("../../../images/jobpost.png")}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Don’t have an any post
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            create your post
          </Text>
        </View>
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
