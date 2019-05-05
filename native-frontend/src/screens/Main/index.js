import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { connect } from 'react-redux';

import { addRounds } from '../../actions/rounds';
import { addStats } from '../../actions/stats';

// import { Rounds } from './Rounds';
import { Stats } from './Stats';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 40
  },
  titleView: {
    alignSelf: 'stretch',
    paddingBottom: 30
  },
  titleText: {
    fontSize: 30
  }
});

class MainComponent extends React.Component {
  componentDidMount = () => {
    if (this.props.stats.length === undefined) {
      console.log('getting stats');
      this.props.addStats();
    }
    if (this.props.rounds.length === undefined) {
      console.log('getting rounds');
      this.props.addRounds();
    }
  };

  // render = () => (
  //   <ContainerDiv className="container">
  //     <Header className="row">
  //       <div className="col-xs-12">
  //         <h3>all statistics</h3>
  //       </div>
  //     </Header>
  //     <Stats />
  //     <Rounds />
  //   </ContainerDiv>
  // );
  render = () => (
    <View style={styles.mainContainer}>
      <View style={styles.titleView}>
        <Title style={styles.titleText}>all statistics</Title>
      </View>
      <Stats />
      {/* <Rounds /> */}
      <View>
        <Text>testering</Text>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  rounds: state.rounds.data,
  stats: state.stats.data
});

const mapDispatchToProps = dispatch => ({
  addRounds: () => dispatch(addRounds()),
  addStats: () => dispatch(addStats())
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
