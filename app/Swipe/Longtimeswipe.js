import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
  SectionList,
  TextInput,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Top from "../components/Topcontainer";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../App";

import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { LocalizationContext } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { Transitioning, Transition } from "react-native-reanimated";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const stackSize = 4;
const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#FFFFFF",
  black: "#000000",
};

const ANIMATION_DURATION = 200;
const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);
const swiperRef = React.createRef();
const transitionRef = React.createRef();
export default function LongtimeSwiperCard({ route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  console.log("post data");
  console.log(route);
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState([]);
  const [postId, setpostId] = useState({});
  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");

  //to get  or check the handlelike
  const handleLikeButtonPress = (card) => {
    const newCards = data.map((c) => {
      if (c.id === card.id) {
        fetchdata(4, card.id);
        console.log(card);
        return { ...c, liked: c.liked == "true" ? "false" : "true" };
      } else {
        return c;
      }
    });
    setData(newCards);
  };

  async function fetchdata(paras1, paras2) {
    const body = {};
    body.l_id = paras2;
    body.user_id = paras1;
    console.log(body);
    try {
      await fetch("http://192.168.1.2:5000/api/l_like_job", {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("immmmm");
          console.log(result);
        });
    } catch (error) {
      console.warn(error);
    }
  }

  async function setapplied(paras1, paras2) {
    const body = {};
    body.l_p_id = paras2;
    body.user_id = paras1;
    console.log(body);
    try {
      await fetch("http://192.168.1.2:5000/api/longtime_apply_job", {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("immmmm");
          console.log(result);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  //getting a user Location takes time so i need to wait so i make a async function
  const getPermission = async () => {
    //we use foreround permission for gettin Permission inside the app
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please give permissions to acces the Loaction");
      return;
    }
    //To get the current Location
    let CurrentLocation = await Location.getCurrentPositionAsync({});
    setaddress(CurrentLocation);
  };

  console.log("im at aPost page");

  const checkpost = (paras, Datas) => {
    for (let i = 0; i < Datas.length; i++) {
      console.log("Dtaa comes");
      console.log(paras);
      console.log("Data gettt");
      console.log(Datas[i].post_id);
      if (Datas[i].post_id == paras) {
        console.log("result");
        console.log(paras);
        return true;
      }
    }
    return false;
  };
  //To get the applied jobs
  const getJobs = async () => {
    try {
      await fetch(
        `http://192.168.1.5:5000/api/count_apply_job/${route.params.userID}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("giveing the applied jobss");
          console.log(result);
          setpostId(result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //TO CALUCULAET THE DISTANCE..
  function haversine(lat1, lon1, lat2, lon2) {
    // distance between latitudes
    // and longitudes
    console.log("hii im at formula");
    console.log(lat1, lon1, lat2, lon2);
    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

    // convert to radiansa
    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;
    console.log(lat1, lat2);
    // apply formulae
    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6371;
    console.log(rad, a);
    let c = 2 * Math.asin(Math.sqrt(a));
    console.log(c);
    return (rad * c).toFixed();
  }

  useEffect(() => {
    getPermission();

    getdata();
    getJobs();
  }, []);
  const getdata = async () => {
    const body = {};
    body.page = 0;
    try {
      await fetch("http://192.168.1.2:5000/api/limit/L_like_apply_check/4", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("post result");
          console.log(result);
          setData(result["long"]);
          setloading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //post the data
  const postData = async (parameter) => {
    console.log("im at 92");
    console.log(parameter);
    const body = {};
    body.uid = route.params.userID;
    body.post_id = parameter;
    console.log(body);
    try {
      await fetch("http://192.168.1.55000/api/apply_job", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    } catch (error) {
      console.warn(error);
    }
  };
  const getCOntent = () => {
    return <ActivityIndicator size="larger" />;
  };
  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex(Math.floor(Math.random() * data.length - 1) + 1);
  };
  const Card = ({ card }) => {
    const { state, dispatch } = useContext(AuthContext);

    console.log(state);
    console.log("im after");
    const handlenavigation = (paras) => {
      console.log("im at navigatioon");
      console.log(state);
      if (state.userdeatils) {
        console.log("you already applied");
        // console.log(userDetails);
        const newCards = data.map((c) => {
          if (c.id === paras.id) {
            setapplied(4, card.id);
            console.log(card);
            return { ...c, apply: "True" };
          } else {
            return c;
          }
        });
        setData(newCards);
      } else {
        navigation.navigate("Userprofile");
      }
    };
    if (loading) {
      console.log(loading);
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <Animated.ScrollView
        vertical={true}
        horizontal={false}
        decelerationRate={0}
      >
        <TouchableWithoutFeedback
          hitSlop={{ top: 20, bottom: -1100, left: -1100, right: -1000 }}
        >
          <View style={styles.card}>
            <View
              style={{
                marginTop: 20,
                // position: "absolute",
                alignContent: "center",
                marginHorizontal: 10,
                width: 200,
              }}
            >
              <Text style={{ color: "#333", fontWeight: "700", fontSize: 25 }}>
                {data[index].job_title}
              </Text>
              {/* <Text style={{ color: "#333" }}>
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#1da1f2"
                />
                {data[index].location}
              </Text> */}
            </View>
            <View
              style={{
                position: "absolute",
                marginTop: 20,
                marginLeft: 260,
                justifyContent: "space-between",
                width: "25%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ color: "#000000", fontSize: 15, fontWeight: "600" }}
              >
                {/* <FontAwesome name="rupee" size={16} color="#000000" />
                {data[index].payment} */}
                <TouchableOpacity
                  onPress={() => {
                    handleLikeButtonPress(data[index]);
                    console.log("im at the like ", data[index].liked);
                  }}
                >
                  {data[index].liked == "true" ? (
                    <AntDesign name="heart" size={24} color="black" />
                  ) : (
                    <AntDesign name="hearto" size={24} color="black" />
                  )}

                  {/* <AntDesign name="hearto" size={34} color="black" /> */}
                </TouchableOpacity>
              </Text>
              {/* <Text
                style={{ color: "#000000", fontSize: 15, fontWeight: "600" }}
              >
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={24}
                  color="black"
                /> */}
              {/* {t("distance")}: */}
              {/* {address === null ? (
                  <Text>Loading</Text>
                ) : (
                  haversine(
                    address.coords.latitude,
                    address.coords.longitude,
                    data[index].latitude,
                    data[index].longitude
                  )
                )} */}
              {/* KM
              </Text> */}
              <FontAwesome name="share-alt" size={34} color="#333" />
            </View>
            <View>
              {data[index].pic === null ? (
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=600",
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#6BC3FF",
                    marginTop: 10,
                    // marginBottom: 100,
                    borderRadius: 10,
                    resizeMode: "contain",
                    position: "relative",
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: data[index].jobpic,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#6BC3FF",
                    marginTop: 10,
                    // marginBottom: 140,
                    borderRadius: 10,
                    resizeMode: "cover",
                    position: "relative",
                  }}
                />
              )}
            </View>
            <View
              style={{
                // marginTop: 340,
                // position: "absolute",
                marginHorizontal: 10,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {t("posted")}
                </Text>
                {data[index].profilepic === null ? (
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=600",
                    }}
                    style={{
                      backgroundColor: "purple",
                      width: 55,
                      height: 55,
                      marginTop: 35,

                      borderRadius: 50,
                      resizeMode: "contain",
                      borderColor: "#6BC3FF",
                      borderWidth: 1,
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: data[index].profilepic,
                    }}
                    style={{
                      backgroundColor: "purple",
                      width: 55,
                      height: 55,
                      marginTop: 35,

                      borderRadius: 50,
                      resizeMode: "contain",
                      borderColor: "#6BC3FF",
                      borderWidth: 1,
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  marginLeft: 70,
                  marginTop: 30,
                  // justifyContent: "space-between",
                  flexDirection: "row",
                  width: 200,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#333",
                        fontSize: 18,
                        width: "90%",
                        fontWeight: "900",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      {data[index].username}
                    </Text>
                    <View style={{ marginLeft: 30 }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("messagefake")}
                      >
                        <AntDesign name="message1" size={40} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text> {data[index].job_title}</Text>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={["#e9eef0", "#e9eef0"]}
              style={{ marginTop: 30 }}
            >
              <View
                key={data[index].id}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 20,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "57%",
                    marginLeft: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: 150,
                    }}
                  >
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        marginBottom: 10,

                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",

                          flexDirection: "row",
                          marginHorizontal: 10,

                          alignContent: "center",
                        }}
                      >
                        <FontAwesome name="rupee" size={22} color="#333" />
                        <Text
                          style={{
                            // marginTop: 3,

                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {data[index].Salary}/{data[index].per}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        marginBottom: 10,

                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",

                          flexDirection: "row",
                          marginHorizontal: 10,

                          alignContent: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="timer-sand"
                          size={22}
                          color="#333"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {data[index].Duration}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        marginBottom: 10,

                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",

                          flexDirection: "row",
                          marginHorizontal: 10,

                          alignContent: "center",
                        }}
                      >
                        <SimpleLineIcons
                          name="graduation"
                          size={24}
                          color="#333"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {data[index].Duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 3,
                    }}
                  >
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        borderRadius: 20,
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          // marginBottom: 10,
                          width: 150,
                          marginHorizontal: 10,
                          alignContent: "center",
                        }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={22}
                          color="#333"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {data[index].location}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        marginBottom: 10,

                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          // marginBottom: 10,
                          width: 150,
                          marginHorizontal: 10,
                          alignContent: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="map-marker-distance"
                          size={22}
                          color="#333"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {data[index].distance} km
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderColor: "#707070",
                        borderWidth: 1,
                        marginBottom: 10,

                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                          // marginBottom: 10,
                          width: 150,
                          marginHorizontal: 10,
                          alignContent: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="bag-personal-outline"
                          size={20}
                          color="#333"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 13,
                            fontWeight: "400",
                          }}
                        >
                          Fresher
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      marginHorizontal: 20,
                      marginVertical: 20,
                    }}
                  >
                    {t("des")}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      marginHorizontal: 20,
                      color: "#626262",
                    }}
                  >
                    {data[index].job_description}
                  </Text>
                  <View style={{ flex: 1, marginTop: 5 }}>
                    <Image
                      source={{
                        uri: "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
                      }}
                      style={{
                        position: "relative",
                        marginHorizontal: 20,

                        backgroundColor: "purple",
                        width: "90%",
                        height: 100,
                        marginTop: 10,
                        borderRadius: 10,
                        resizeMode: "cover",
                      }}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 60,
                        marginTop: 30,
                        marginLeft: 20,
                        color: "#e33442",
                      }}
                    >
                      Zomato
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      width: "90%",
                      alignItems: "center",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleCallclick(data[index])}
                    >
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
                        <FontAwesome name="phone" size={24} color="#fff" />
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "600",
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          Call Now
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        backgroundColor: "black",
                        padding: 3,
                        textAlign: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        {data[index].Duration}
                        {data[index].Duration2}
                      </Text>
                    </LinearGradient> */}
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate("Userprofile");
                        handlenavigation(data[index]);
                      }}
                      disabled={data[index].apply == "True"}
                    >
                      <LinearGradient
                        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                        style={{
                          height: 42,
                          width: 160,
                          borderRadius: 10,
                          marginTop: 30,
                          opacity: data[index].apply == "True" ? 0.5 : 1,
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
                          }}
                        >
                          {data[index].apply == "True"
                            ? "Applied"
                            : "Apply Now"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 50, height: 400 }}>
                    {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      {t("e_skill")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        marginTop: 10,
                        color: "#626262",
                        marginHorizontal: 10,
                      }}
                    >
                      {data[index].e_skill_set}
                    </Text> */}
                    {/* <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        marginTop: 100,
                        textAlign: "center",
                        padding: 3,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        Masonry skill
                      </Text>
                    </LinearGradient>
                    <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        marginTop: 100,
                        marginLeft: 120,
                        textAlign: "center",
                        padding: 3,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        Plumbing
                      </Text>
                    </LinearGradient> */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        marginHorizontal: 20,
                        marginVertical: 10,
                      }}
                    >
                      Location :
                    </Text>
                    <Image
                      style={{
                        height: 100,
                        width: "90%",
                        marginTop: 10,
                        borderRadius: 10,
                        resizeMode: "cover",
                        marginHorizontal: 20,
                      }}
                      source={{
                        uri: "https://velai3.s3.ap-south-1.amazonaws.com/29/map.png",
                      }}
                    />
                    {/* <Image
                      style={{
                        height: 100,
                        width: "90%",
                        marginTop: 10,
                        borderRadius: 10,
                        resizeMode: "cover",
                        marginHorizontal: 20,
                      }}
                      source={require("../components/Maincategory/dataimage/IT.png")}
                    /> */}
                    {/* <Text
                      style={{
                        height: 2,
                        width: 350,
                        backgroundColor: "#727a83",
                        marginTop: 90,
                      }}
                    ></Text> */}
                  </View>
                </View>

                {/* <Text style={[styles.text]}>{data[index].des}</Text> */}
              </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Animated.ScrollView>
    );
  };
  const [swipedAll, setSwipedAll] = useState(false);

  const handleOnSwipedAll = () => {
    console.log("I get the daata");
    if (!swipedAll) {
      // setloading(true);
      // getdata1(page);
      console.log("i get the data");
      console.log(data);
      Alert.alert("No more cards left!");
      setSwipedAll(true);
      getdata();
      // Timeout used for show Ripples loader to remove swiper container re-render glitch
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Top /> */}
      {/* <SearchBar /> */}
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("tophome")}>
          <AntDesign name="doubleleft" size={24} color="black" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity onPress={() => navigation.navigate("Longtimefilter")}>
        <View
          style={{
            width: 280,
            height: 35,
            borderWidth: 1,
            // paddingLeft: 20,
            // margin: 5,

            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: 20,
            // marginLeft: 200,
            borderColor: "#707070",
            backgroundColor: "#fffff",
            marginHorizontal: 59,
            marginVertical: 15,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <EvilIcons name="search" size={24} color="#707070" />
          </View>
          <TextInput
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search here"
            style={{ marginLeft: 10 }}
          />
          <View
            style={{
              marginLeft: 130,
              marginTop: 5,
            }}
          >
            <FontAwesome name="microphone" size={24} color="#707070" />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Swiper
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={(card) => <Card card={card} />}
          backgroundColor={"transparent"}
          cardVerticalMargin={1}
          cardHorizontalMargin={3}
          onSwiped={onSwiped}
          useNativeDriver={true}
          stackSize={stackSize}
          swipeTop={false}
          swipeBottom={false}
          stackScale={10}
          disableTopSwipe={false}
          stackSeparation={14}
          horizontalSwipe={true}
          verticalSwipe={false}
          animateOverlayLabelsOpacity
          animateCardOpacity={false}
          verticalThreshold={height / 5}
          horizontalThreshold={width / 4}
          stackAnimationTension={40}
          stackAnimationFriction={7}
        />

        <View>
          <Transitioning.View
            ref={transitionRef}
            transition={transition}
          ></Transitioning.View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  card: {
    flex: 0.8,
    position: "relative",
    shadowRadius: 50,
    borderRadius: 40,
    width: "100%",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 10,
    shadowColor: "black",
    backgroundColor: "#e9eef0",
    // borderColor: "#1E5966",
    // borderWidth: 3,
    borderBottomEndRadius: 30,
  },

  heading: {
    fontSize: 24,
    color: colors.gray,
  },
});
