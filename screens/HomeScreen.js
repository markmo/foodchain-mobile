import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, InputItem, List, Picker, WhiteSpace } from 'antd-mobile-rn';
import { WebBrowser } from 'expo';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    const listItems = [
      {
        shipmentId: 'SHIP001',
        type: 'BANANAS',
        status: 'HARVESTED',
        unitOfMeasure: 'ITEMS',
        unitCount: 50,
      },
      {
        shipmentId: 'SHIP002',
        type: 'COFFEE',
        status: 'IN_TRANSIT_TO_SUPPLIER',
        unitOfMeasure: 'ITEMS',
        unitCount: 50,
        temperatureReadings: [
          {
            dateTime: '2019-03-01 14:10',
            celsius: 14.5
          },
          {
            dateTime: '2019-03-01 15:10',
            celsius: 12.6
          },
          {
            dateTime: '2019-03-01 16:10',
            celsius: 14.2
          }
        ]
      },
      {
        shipmentId: 'SHIP003',
        type: 'PEARS',
        status: 'IN_TRANSIT_TO_DISTRIBUTOR',
        unitOfMeasure: 'ITEMS',
        unitCount: 50,
      },
      {
        shipmentId: 'SHIP004',
        type: 'COFFEE',
        status: 'RECEIVED_BY_SUPPLIER',
        unitOfMeasure: 'ITEMS',
        unitCount: 50,
      },
      {
        shipmentId: 'SHIP005',
        type: 'PEARS',
        status: 'RECEIVED_AT_STORE',
        unitOfMeasure: 'ITEMS',
        unitCount: 50,
      },
    ];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/foodchain.png')}
              style={styles.welcomeImage}
            />
            <Text>Foodchain Mobile</Text>
          </View>
          <View>
            <Text style={styles.getStartedText}>Shipments</Text>
            <List>
              {listItems.map((it, i) =>
                <List.Item key={it.shipmentId} arrow='horizontal' onClick={() => {
                  this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home' })
                    ],
                  }));
                  this.props.navigation.dispatch(NavigationActions.navigate({
                    routeName: 'Detail',
                    params: { shipment: listItems[i] },
                  }));
                }}>{it.shipmentId}</List.Item>
              )}
            </List>
            <Button type="primary" onClick={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }));
              this.props.navigation.dispatch(NavigationActions.navigate({
                routeName: 'AddShipment',
              }));
            }}>Add</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class DetailScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const shipment = navigation.getParam('shipment');
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.getStartedText}>Shipment Detail</Text>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{shipment.shipmentId}</Text>
        <WhiteSpace size="lg" />
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{shipment.type}</Text>
        <WhiteSpace size="lg" />
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{shipment.status}</Text>
        <WhiteSpace size="lg" />
        <Text style={styles.label}>UOM</Text>
        <Text style={styles.value}>{shipment.unitOfMeasure}</Text>
        <WhiteSpace size="lg" />
        <Text style={styles.label}>Count</Text>
        <Text style={styles.value}>{shipment.unitCount}</Text>
      </View>
    );
  }
}

class AddShipmentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productType: undefined,
      status: '',
      unitOfMeasure: '',
      unitCount: ''
    };
  }

  render() {
    const productTypes = [
      { label: 'BANANAS', value: 'BANANAS' },
      { label: 'APPLES', value: 'APPLES' },
      { label: 'PEARS', value: 'PEARS' },
      { label: 'PEACHES', value: 'PEACHES' },
      { label: 'COFFEE', value: 'COFFEE' },
    ];
    return (
      <View>
        <List renderHeader={'Add Shipment'}>
          <Picker
            data={productTypes}
            okText={'OK'}
            dismissText={'Cancel'}
            extra={'Select...'}
            value={this.state.productType}
            onChange={val => {
              this.setState({ productType: val })
            }}>
            <List.Item arrow="horizontal">Product Type</List.Item>
          </Picker>
          <WhiteSpace size="lg" />
          <InputItem
            clear
            placeholder={'Enter unit of measure'}
            value={this.state.unitOfMeasure}
            onChange={val => {
              this.setState({ unitOfMeasure: val })
            }}/>
          <WhiteSpace size="lg" />
          <InputItem
            clear
            placeholder={'Enter unit count'}
            value={this.state.unitCount}
            onChange={val => {
              this.setState({ unitCount: val })
            }}/>
        </List>
        <Button type="primary" onClick={() => {
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' })
            ],
          }));
          this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'Master',
          }));
        }}>Submit</Button>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Master: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  AddShipment: { screen: AddShipmentScreen },
}, { initialRouteName: 'Master' });

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  detailContainer: {
    margin: 20,
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    fontSize: 17,
  },
});
