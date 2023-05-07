import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import {Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { RootNavigationProp } from "../../types/navigation";
import { Switch } from 'react-native-switch';
import { useStore } from "../../stores/store";

const DriverOffersScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [toggleRideReserve, setToggleRideReserve] = useState(true);
  const [expanded, setExpandedAccordionListItem] = useState(true);
  const { username } = useStore().commonStore;
  const [rideRequests, updateRideRequests] = useState([]);
  const [reserveRequests, updateReserveRequests] = useState([]);
  const [rideOffers, updateRideOffers] = useState<any[]>([]);
  const [reserveOffers, updateReserveOffers] = useState<any[]>([]);

  const toggleSwitch = () => {
    setToggleRideReserve(!toggleRideReserve);
    };

  const setExpanded = () => {
    setExpandedAccordionListItem(!expanded);
    };
  
  //update ride requests
  useEffect(() => {

    const interval = setInterval(() => {

    (async () => {
      
      let axios = require('axios');
      let data = JSON.stringify({
          "collection": "ridesQueue",
          "database": "RaimeiDB",
          "dataSource": "Cluster0",
          "filter": {
            "username": username
          }
      });

      let config = {
          method: 'post',
          url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/find',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
          },
          data: data
      };

      axios(config)
          .then(function (response) {
              // console.log(JSON.stringify(response.data)); 
              // console.log(response.data.documents[0].dropOffLocation, response.data.documents[0].pickUpLocation,
              //   response.data.documents[0]._id);
              // response.data.document.negotiationsRide

              //ride request objects
              updateRideRequests(response.data.documents);

              //build negotiation offers array from user's ride requests
              const negotiationOffers = [];

              for (const rideRequest of response.data.documents) {
                for(const rideRequestOffer of rideRequest.negotiationsRide) {
                  negotiationOffers.push(rideRequestOffer);
                }
              }

              updateRideOffers(negotiationOffers);



          })
          .catch(function (error) {
              console.log(error);
          });
            
          })();

  }, 1000);
  return () => clearInterval(interval);

  }, []);


  //update reserve requests
  useEffect(() => {

    const interval = setInterval(() => {

    (async () => {
      
      let axios = require('axios');
      let data = JSON.stringify({
          "collection": "reservesQueue",
          "database": "RaimeiDB",
          "dataSource": "Cluster0",
          "filter": {
            "username": username
          }
      });

      let config = {
          method: 'post',
          url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/find',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
          },
          data: data
      };

      axios(config)
          .then(function (response) {
              // console.log(JSON.stringify(response.data)); 
              // console.log(response.data.documents[0].dropOffLocation, response.data.documents[0].pickUpLocation,
              //   response.data.documents[0]._id);
              // response.data.document.negotiationsRide

              //reserve ride objects
              updateReserveRequests(response.data.documents);

              //build negotiation offers array from user's reserve rides
              const negotiationOffers = [];

              for (const reserveRide of response.data.documents) {
                for(const reserveRideOffer of reserveRide.negotiationsReserve) {
                  negotiationOffers.push(reserveRideOffer);
                }
              }

              updateReserveOffers(negotiationOffers);

          })
          .catch(function (error) {
              console.log(error);
          });
            
          })();

  }, 1000);
  return () => clearInterval(interval);

  }, []);


  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={{ marginTop: 100,marginBottom: 40, alignSelf:"center"}}>
      <Switch
          value={toggleRideReserve}
          onValueChange={()=>{
          toggleSwitch();
          }}
          disabled={false}
          activeText={'Ride'}
          inActiveText={'Reserve'}
          circleSize={40}
          barHeight={40}
          circleBorderWidth={3}
          backgroundActive={"#4f284b"}
          backgroundInactive={"#4f284b"}
          circleActiveColor={"#BDB5D5"}
          circleInActiveColor={"#BDB5D5"}
          switchLeftPx={2}
          switchRightPx={5}
          switchWidthMultiplier={3}
          switchBorderRadius={40}
      />
      </View>
      <View>
      {toggleRideReserve && 
        <View> 
          <ListItem.Accordion
            content= {
              <>
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{color: "black", fontSize: 30, marginTop: 5, marginBottom: 40, alignSelf:"center"}}>Ride Requests</Text>
                </ListItem.Title>
              </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded();
            }}
            >
            <ScrollView>
              {rideRequests.map((rideRequest: object) => (
                <Collapse key={rideRequest._id}>
                <CollapseHeader>
                  <ListItem bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title style = {{ flexDirection: "column"}} > 
                      <View style={{marginBottom: 10}}><Text style={{fontWeight: 'bold'}}>Pickup: {rideRequest.pickUpLocation}</Text></View>
                      <View><Text style={{fontWeight: 'bold'}}>Dropoff: {rideRequest.dropOffLocation}</Text></View>
                    </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </CollapseHeader>
                  <CollapseBody>
                    <ListItem key={rideRequest._id} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          <Text>Ride Details:</Text>
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </CollapseBody>
                </Collapse>
              ))}
            </ScrollView>
          </ListItem.Accordion>
        </View>
      }
      </View>
      <View>
      {!toggleRideReserve && <Text style={{color: "black", fontSize: 30, marginTop: 5,marginBottom: 40, alignSelf:"center"}}>Reserve Requests</Text>}
      </View>
      <View>
      {toggleRideReserve && <Text style={{color: "black", fontSize: 30, marginTop: 40,marginBottom: 40, alignSelf:"center"}}>Driver Ride Offers</Text>}
      </View>
      <View>
      {!toggleRideReserve && <Text style={{color: "black", fontSize: 30, marginTop: 40,marginBottom: 40, alignSelf:"center"}}>Driver Reserve Offers</Text>}
      </View>
    </View>
  );
};

export default observer(DriverOffersScreen);

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#BDB5D5",
    position: "absolute",
    top: 28,
    left: 8,
    zIndex: 50,
    padding: 12,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  half: {
    height: "50%",
  },
});