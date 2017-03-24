/**
 * Created by Mikhail on 05.12.2016.
 */

import {PATH_API_USER, IMAGE_PATH} from './paths.js';

export function getPathApiUserSkills() {
    return PATH_API_USER + localStorage.getItem('userId') + '/skill/';
}

export function getPathApiUserWishes() {
    return PATH_API_USER + localStorage.getItem('userId') + '/wish/';
}

export function getPathApiUserMessages() {
    return PATH_API_USER + localStorage.getItem('userId') + '/messages/';
}
export function getPathApiUserChats() {
    return PATH_API_USER + localStorage.getItem('userId') + '/chats/';
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