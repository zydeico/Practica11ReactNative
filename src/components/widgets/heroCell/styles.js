import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import * as Colors from "../../../commons/colors";

export default StyleSheet.create({
  cellContainer: {
    overflow: "hidden",
    width: width / 2,
    height: width / 2,
    backgroundColor: Colors.black,
    borderRadius: 20,
    borderColor: Colors.black,
    borderWidth: 5
  },
  text: {
    textAlign: "center",
    height: "15%",
    fontSize: 16,
    color: "white",
    backgroundColor: Colors.primay
  }
});
