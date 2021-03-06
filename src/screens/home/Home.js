import React, { Component } from 'react';
import { View, BackHandler, Text } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { ACCENT_COLOR, SUCCESS_COLOR, FAILURE_COLOR } from '../../constant';

class HomeScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  resolveChart() {
    const { totalSales, totalPurchases } = this.props.totals;
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.headingStyle}>Totals</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          width={widthPercentageToDP('90%')}
          alignment="middle"
          style={{
            parent: {
              border: '1px solid #ccc',
              paddingLeft: 20,
            },
          }}
          padding={{ left: 60, top: 40, bottom: 130 }}
          domainPadding={{ x: [100, 100], y: 5 }}
          animate={{ duration: 1000 }}
        >
          <VictoryAxis
            style={{
              axis: { stroke: '#000' },
              axisLabel: { fontSize: 9, padding: 45 },
              ticks: { stroke: '#000' },
              grid: { stroke: '#B3E5FC', strokeWidth: 0.25 },
              tickLabels: {
                fontSize: 9,
                padding: 1,
              },
            }}
            dependentAxis
            label="Amount"
          />

          <VictoryAxis
            style={{
              axis: { stroke: '#000' },
              axisLabel: { fontSize: 9, padding: 30 },
              ticks: { stroke: '#000' },
              tickLabels: {
                fontSize: 9,
                padding: 1,
              },
            }}
            label="Type"
          />

          <VictoryBar
            style={{
              data: { fill: SUCCESS_COLOR, width: 80 },
              labels: {
                fontSize: 9,
              },
            }}
            data={
              totalSales
                ? [
                    {
                      x: 'Total Sales',
                      y: parseInt(totalSales),
                      label: `₹${totalSales}`,
                    },
                  ]
                : []
            }
            alignment="middle"
          />
          <VictoryBar
            style={{
              data: { fill: FAILURE_COLOR, width: 80 },
              labels: {
                fontSize: 9,
              },
            }}
            data={
              totalPurchases
                ? [
                    {
                      x: 'Total purchases',
                      y: parseInt(totalPurchases),
                      label: `₹${totalPurchases}`,
                    },
                  ]
                : []
            }
            alignment="middle"
          />
        </VictoryChart>
      </View>
    );
  }

  render() {
    return <View style={{ flex: 1, justifyContent: 'center' }}>{this.resolveChart()}</View>;
  }
}

const styles = {
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#CBCBCB',
    width: '70%',
    alignSelf: 'center',
    marginTop: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 6,
  },
  menuItem: {
    padding: 10,
    borderColor: '#cecece',
    borderBottomWidth: 1,
  },
  headingStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: '#ededed',
  },
};
const mapStateToProps = state => {
  const { totals } = state.dashboard.data;

  return { totals };
};
export default connect(mapStateToProps)(HomeScreen);
