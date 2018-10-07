import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import ImagePicker from "react-native-image-picker";
import * as Colors from "../../../commons/colors";
import { Actions } from "react-native-router-flux";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      comics: "",
      series: "",
      stories: "",
      image: null
    };
    this.options = {
      title: "Select image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
  }

  _renderTextInput(label, key, placeholder = "", style) {
    return (
      <TextInput
        label={label}
        style={style}
        placeholderTextColor={"gray"}
        value={this.state[key]}
        onChangeText={v => this.setState({ [key]: v })}
        placeholder={placeholder}
      />
    );
  }

  _renderImageInput() {
    const image = this.state.image
      ? this.state.image.preview
      : require("../../../resources/marvel_placeholder.png");
    return (
      <TouchableOpacity onPress={() => this._onImagePickerTapped()}>
        <Image source={image} resizeMode={"cover"} style={[styles.image]} />
        <Text style={styles.imageText}>{"TAP TO SELECT IMAGE"}</Text>
      </TouchableOpacity>
    );
  }

  _onImagePickerTapped() {
    ImagePicker.showImagePicker(this.options, response => {
      if (response.uri && response.data) {
        let preview = { uri: response.uri };
        let data = "data:image/jpeg;base64," + response.data;
        this.setState({
          image: { preview, data }
        });
      }
    });
  }

  _validateForm() {
    const { name, description, comics, series, stories, image } = this.state;
    console.log("NAME: ", name);
    console.log("DESC: ", description);
    console.log("COMICS: ", comics);
    console.log("SERIES: ", series);
    console.log("STORIES: ", stories);
    console.log("IMAGE: ", image);
    if (name && description && comics && series && stories && image) {
      return true;
    } else {
      return false;
    }
  }

  _onSubmit() {
    if (this._validateForm()) {
      Alert.alert(
        "Yeeha!",
        "A new spidey has been added (unfortunately, it is not saved in the API 😜 )"
      );
      Actions.pop();
    } else {
      Alert.alert("Oops!", "Please, check the fields");
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View>{this._renderImageInput()}</View>
          <View style={styles.dataContainer}>
            {this._renderTextInput(
              this.state.name,
              "name",
              "Spider-Name...",
              styles.titleText
            )}
            {this._renderTextInput(
              this.state.name,
              "description",
              "Spider-Description....",
              styles.text
            )}
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detailItem}>
              <Text numberOfLines={1} style={styles.titleText}>
                Comics
              </Text>
              {this._renderTextInput(
                this.state.comics,
                "comics",
                "0",
                styles.detailCount
              )}
            </View>
            <View style={styles.detailItem}>
              <Text numberOfLines={1} style={styles.titleText}>
                Series
              </Text>
              {this._renderTextInput(
                this.state.series,
                "series",
                "0",
                styles.detailCount
              )}
            </View>
            <View style={styles.detailItem}>
              <Text numberOfLines={1} style={styles.titleText}>
                Stories
              </Text>
              {this._renderTextInput(
                this.state.stories,
                "stories",
                "0",
                styles.detailCount
              )}
            </View>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.primay
            }}
          >
            <Button
              title={"CREATE NEW SPIDEY"}
              color={"white"}
              style={styles.button}
              onPress={() => this._onSubmit()}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
