import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { HeroCell } from "../../widgets/";
import styles from "./styles";
import { connect } from "react-redux";
import * as HeroesActions from "../../../redux/heroes/actions";

class Heroes extends Component {
  componentDidMount() {
    this.props.fetchHeroesList();
  }

  _onHeroTapped(hero) {
    this.props.onHeroTapped(hero);
  }

  _renderItem({ item }) {
    return <HeroCell hero={item} onHeroPress={v => this._onHeroTapped(v)} />;
  }

  _renderActivityIndicator() {
    if (!this.props.isFetching) {
      return null;
    }
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} animating={true} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderActivityIndicator()}

        <FlatList
          data={this.props.list}
          renderItem={value => this._renderItem(value)}
          keyExtractor={(item, i) => "cell" + item.id}
          extraData={this.props}
          numColumns={2}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.heroes.isFetching,
    list: state.heroes.list
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHeroesList: () => {
      dispatch(HeroesActions.fetchHeroesList());
    },
    onHeroTapped: hero => {
      dispatch(HeroesActions.setItem(hero));
      Actions.hero({ title: hero.name.toUpperCase(), hero: hero });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heroes);
