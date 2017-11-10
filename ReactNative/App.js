import React from 'react';
import Communications from 'react-native-communications';
import { StyleSheet, Text, ScrollView, TextInput, Button, ListView} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

global.naturepoints = [
    {
        location: "location1",
        name: "name1",
        description: "description1",
        rating: 10.0
    },
    {
        location: "location2",
        name: "name2",
        description: "description2",
        rating: 8.0
    },
    {
        location: "location3",
        name: "name3",
        description: "description3",
        rating: 9.0
    },
]

class Contact extends React.Component {
    static navigationOptions = { tabBarLabel: 'Contact', };

    constructor(props) {
        super(props);
        this.state = {subject:"", body:""}
    }

    send_mail() { Communications.email(["topanmihai@gmail.com"], null, null, this.state.subject, this.state.body); }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>
                    Contact
                </Text>
                <Text>
                    Subject
                </Text>
                <TextInput style={styles.defaultTextInput}
                           value={this.state.subject}
                           onChangeText={(subject)=>this.setState({subject: subject, body: this.state.body})}>
                </TextInput>
                <Text>
                    Message
                </Text>
                <TextInput style={styles.defaultMultiLine}
                           multiline={true}
                           value={this.state.body}
                           onChangeText={(body)=>this.setState({subject: this.state.subject, body: body})}>
                </TextInput>
                <Button style={styles.defaultButton}
                        title="Send"
                        onPress={this.send_mail.bind(this)}>
                </Button>
            </ScrollView>
        );
    }
}

class ViewList extends React.Component {
    static navigationOptions = { tabBarLabel: 'ViewList', };

    constructor(props) {
        super(props);
        const data_set = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = { dataSource: data_set.cloneWithRows(global.naturepoints), };
    }

    render_row(row_data) {
        return(
            <Button title={row_data.location} onPress={()=> this.props.navigation.navigate("ViewElement", row_data)}/>
        );
    }

    render() {
        return (
            <ListView dataSource={this.state.dataSource}
                      renderRow={(rowData)=>this.render_row(rowData)} />
        );
    }
}

class ViewElement extends React.Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.state = {location: "", name: "", description: "", rating: 0.0};

        let current_element = this.props.navigation.state.params;
        this.state.location = current_element.location;
        this.state.name = current_element.name;
        this.state.description = current_element.description;
        this.state.rating = current_element.rating;
    }

    edit() {
        place = this.state;
        for(let i = 0; i < global.naturepoints.length; i++){
            if(global.naturepoints[i].location.localeCompare(place.location) == 0){
                global.naturepoints[i].name = place.name;
                global.naturepoints[i].description = place.description;
                global.naturepoints[i].rating = place.rating;
            }
        }
        
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>{this.state.location}</Text>
                <TextInput style={styles.defaultTextInput}
                           value={this.state.name.toString()}
                           onChangeText={(name)=>this.setState({name})}/>
                <TextInput style={styles.defaultTextInput}
                           value={this.state.description.toString()}
                           onChangeText={(description)=>this.setState({description})}/>
                <TextInput style={styles.defaultTextInput}
                           value={this.state.rating.toString()}
                           onChangeText={(rating)=>this.setState({rating})}/>
                <Button title="Edit"
                        onPress={()=>this.edit()}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        flex:1,
        flexDirection:"row",
        justifyContent: "space-around"
    },
    container: { paddingVertical: 60 },
    titleText: { fontSize:48 },
    defaultTextInput: { height:40 },
    defaultMultiLine: {
        height: 250,
        textAlignVertical: 'top'
    },
    defaultButton: {}
});

const NatureX = TabNavigator({
    Home: {
        screen: Contact,
    },
    ViewList: {
        screen: ViewList
    },
},
{
    tabBarPosition: 'top',
    animationEnabled: true,
});

const MainScreenNavigator = StackNavigator({
    Home: { screen: NatureX },
    ViewElement: {
        screen: ViewElement,
        path: "ViewElement/:place"
    }
});

export default MainScreenNavigator;