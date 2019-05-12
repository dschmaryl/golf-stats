import React from 'react';

export const Main = () => <div><p>logged in</p></div>

// import { View, StyleSheet, Dimensions } from 'react-native';
// import { Title } from 'react-native-paper';
// import { connect } from 'react-redux';

// import { addRounds } from '../../actions/rounds';
// import { addStats } from '../../actions/stats';

// import { Rounds } from './Rounds';
// import { Stats } from './Stats';

// const { width } = Dimensions.get('window');
// const MAX_WIDTH = 800;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   contentContainer: {
//     minWidth: width > MAX_WIDTH ? MAX_WIDTH : width - 10,
//     maxWidth: MAX_WIDTH
//   },
//   titleView: {
//     paddingVertical: 30
//   },
//   titleText: {
//     fontSize: 30
//   }
// });

// class MainComponent extends React.Component {
//   componentDidMount = () => {
//     if (this.props.stats.length === undefined) {
//       console.log('getting stats');
//       this.props.addStats();
//     }
//     if (this.props.rounds.length === undefined) {
//       console.log('getting rounds');
//       this.props.addRounds();
//     }
//     console.log(width);
//   };

//   render = () => (
//     <View style={styles.mainContainer}>
//       <View style={styles.contentContainer}>
//         <View style={styles.titleView}>
//           <Title style={styles.titleText}>all statistics</Title>
//         </View>
//         <Stats />
//         <Rounds />
//       </View>
//     </View>
//   );
// }

// const mapStateToProps = state => ({
//   rounds: state.rounds.data,
//   stats: state.stats.data
// });

// const mapDispatchToProps = dispatch => ({
//   addRounds: () => dispatch(addRounds()),
//   addStats: () => dispatch(addStats())
// });

// export const Main = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MainComponent);
