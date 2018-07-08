import React from 'react';
import { AsyncStorage } from 'react-native';

const MySyncTask = async () => {
    await Synchronizer.synchronize()
};

class Synchronizer {

    static async synchronize()
    {
        console.log(JSON.stringify(global.viewlist.state.dataSource))
    }

    static async handleError(error: ?Error)
    {
        if(error !== null)
        {
            console.log("[ERROR] encountered: ", JSON.stringify(error));
            return 1;
        }
        console.log("[INFO] Success!");
        return 0;
    }

    static async getAll()
    {
        console.log("Get all on async storage called!");
        await AsyncStorage.getAllKeys((error, keys) => Synchronizer.keysReady(error, keys));
        console.log(JSON.stringify(global.naturepoints));
    }

    static async keysReady(error, keys)
    {
        for (let i = 0; i < keys.length; i++) {
            AsyncStorage.getItem(keys[i], (error, result) => Synchronizer.getOne(error, result));
        }
    }

    static async getOne(error, result)
    {
        global.naturepoints.push(JSON.parse(result));
        console.log(`[INFO] Succesfully loaded element ${result}`);
        global.viewlist.update_callback();
    }

    static async addOne(id, object)
    {
        console.log(`add(${id}, ${object}) on async storage called!`);
        await AsyncStorage.setItem(id.toString(), JSON.stringify(object), (error) => Synchronizer.handleError(error));
    }

    static async editOne(id, object)
    {
        console.log(`edit(${id}, ${object}) on async storage called!`);
        AsyncStorage.setItem(id.toString(), JSON.stringify(object), (error) => Synchronizer.handleError(error));
    }

    static async removeOne(id)
    {
        console.log(`delete(${id}) on async storage called!`);
        AsyncStorage.removeItem(id.toString(), (error) => Synchronizer.handleError(error));
    }

    static async printKeys(error: ?Error, keys: ?Array<string>)
    {
        for(let i = 0; i < keys.length; i++)
        {
            AsyncStorage.getItem(keys[i], (error, result) => Synchronizer.printElement(error, result));
        }
    }

    static async printElement(error: ?Error, result: ?string)
    {
        console.log(JSON.stringify(error));
        console.log(result);
    }
}

module.exports = {
    MySyncTask,
    Synchronizer
};
