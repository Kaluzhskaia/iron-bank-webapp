/**
 * Created by Mikhail on 05.12.2016.
 */

import {IMAGE_PATH, TOKEN, JWT_HEADER} from "./constants.js";

export function getToken() {
    return localStorage.getItem(TOKEN)
}

export function createAuthorizationTokenHeader() {
    return {"Authorization" : getToken()}

}

export function getConfig() {
    let config = {
        headers: {"x-auth-token": localStorage.getItem('token')},
    }

    return config;
}

export function getImagePath(imageName){
    return IMAGE_PATH + imageName;
}

export function getDataSourceConfig() {
    let config = {
        text: 'name',
        value: 'id'
    };
    return config;
}

export function indexOfSkill(skills, skillName) {
    for (let i = 0; i < skills.length; i++) {
        if (skills[i].name == skillName) {
            return i;
        }
    }
    return -1;
}

export function addSkill(url, data, config) {
    axios.put(url, data, config);
}