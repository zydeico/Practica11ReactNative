import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import styles from "./styles";
import { Actions } from "react-native-router-flux";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageExpanded: false,
      animatedHeight: new Animated.Value(0)
    };
  }

  _onShowImage() {
    if (this.state.imageExpanded) {
      Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: 1000
      }).start();
      this.setState({ imageExpanded: false });
    } else {
      Animated.timing(this.state.animatedHeight, {
        toValue: 300,
        duration: 1000
      }).start();
      this.setState({ imageExpanded: true });
    }
  }

  componentWillMount() {
    this._onShowImage();
  }

  render() {
    const { hero } = this.props;
    const imageUri = hero.thumbnail.path + "." + hero.thumbnail.extension;
    const image = imageUri
      ? { uri: imageUri }
      : require("../../../resources/marvel_placeholder.png");
    const description = hero.description ? hero.description : "";
    return (
      <ScrollView style={styles.container}>
        <Animated.Image
          source={image}
          resizeMode={"cover"}
          style={[styles.image, { height: this.state.animatedHeight }]}
        />
        <View style={styles.dataContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            {hero.name}
          </Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detailItem}>
            <Text numberOfLines={1} style={styles.titleText}>
              Comics
            </Text>
            <Text numberOfLines={1} style={styles.detailCount}>
              {hero.comics.available}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text numberOfLines={1} style={styles.titleText}>
              Series
            </Text>
            <Text numberOfLines={1} style={styles.detailCount}>
              {hero.series.available}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text numberOfLines={1} style={styles.titleText}>
              Stories
            </Text>
            <Text numberOfLines={1} style={styles.detailCount}>
              {hero.stories.available}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
