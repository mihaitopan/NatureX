import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Button, Alert, Picker} from 'react-native';
import {Pie} from 'react-native-pathjs-charts';

class ViewElement extends React.Component {
    static navigationOptions = {
    };
	
    constructor(props) {
        super(props);
        this.state = {location: "", rating: 10, name:"", description: "Description"};

        let current_element = this.props.navigation.state.params["data"];
        this.state.location = current_element.location;
        this.state.name = current_element.name;
        this.state.description = current_element.description;
        this.state.rating = current_element.rating;
    }

    edit() {
        let naturepoint = this.state;
        for(let i = 0; i < global.naturepoints.length; i++){
            if(global.naturepoints[i].location.localeCompare(naturepoint.location)===0){
                global.naturepoints[i].name = naturepoint.name;
                global.naturepoints[i].description = naturepoint.description;
                global.naturepoints[i].rating = naturepoint.rating;
            }
        }

        global.sync.editOne(naturepoint.location, naturepoint);
        global.viewlist.update_callback();
        this.forceUpdate();
        this.props.navigation.goBack();
    }

    remove() {
        Alert.alert( 'Delete', 'Are you sure you want to delete this entry?',
            [ {text: 'No', onPress: () => console.log("Delete canceled")}, {text: 'Yes', onPress: () => this.perform_remove()}, ],
            { cancelable: false } )
    }

    perform_remove() {
        let naturepoint = this.state;
        for(let i = 0; i < global.naturepoints.length; i++){
            if(global.naturepoints[i].location.localeCompare(naturepoint.location)===0){
                global.naturepoints.splice(i, 1);
            }
        }

        global.viewlist.update_callback();
        global.sync.removeOne(naturepoint.location);
        this.props.navigation.goBack();
    }

    render() {
        console.log(this.state.name);
        console.log(this.state.rating);
        const data = [
            {
                number:Number("10" - this.state.rating + 0.00005)
            },
            {
                number:Number(this.state.rating)
            }
        ];

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#000000',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>{this.state.location}</Text>
                <Text>Name: </Text>
                <TextInput style={styles.defaultTextInput} value={this.state.name.toString()} onChangeText={(name)=>this.setState({name})}/>
                <Picker selectedValue={this.state.description} onValueChange={(itemValue, itemIndex) => this.setState({description: itemValue})}>
                    <Picker.Item label="Description" value="Description" />
                    <Picker.Item label="NoDescription" value="NoDescription" />
                    <Picker.Item label="NoNoNoDescription" value="NoNoNoDescription" />
                </Picker>
                <Text>Rating: </Text>
                <TextInput style={styles.defaultTextInput} value={this.state.rating.toString()} onChangeText={(rating)=>this.setState({rating})}/>
                <Button title={"Edit"} onPress={()=>this.edit()}/>
                <Button title={"Delete"} onPress={()=>this.remove()} raised={true}/>
                <Pie
                    data={data}
                    accessorKey="number"
                    options={options}
                    pallete={[{'r':178,'g':34,'b':34}, {'r':34,'g':139,'b':34},]}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    container: {
        paddingVertical: 60
    },
    titleText: {
        fontSize:48
    },
    defaultTextInput: {
        height:40
    },
    defaultMultiLine: {
        height: 250,
        textAlignVertical: 'top'
    }
});

export default ViewElement;
