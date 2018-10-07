import React, { Component } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import styles from "./styles";
import * as Colors from "../../../commons/colors";

export default class extends Component {
  static defaultProps = {
    hero: null,
    onHeroPress: () => {}
  };

  render() {
    const { hero } = this.props;
    const imageUri = hero.thumbnail.path + "." + hero.thumbnail.extension;
    const image = imageUri
      ? { uri: imageUri }
      : require("../../../resources/marvel_placeholder.png");
    return (
      <TouchableOpacity
        onPress={() => this.props.onHeroPress(hero)}
        style={styles.cellContainer}
      >
        <Image
          source={image}
          style={{ width: "100%", height: "85%" }}
          resizeMode={"cover"}
        />
        <Text numberOfLines={1} style={styles.text}>
          {hero.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
