//paths
export const USER_ID = 1;
export const SERVER_HOST = "http://" + require("os").hostname() + ":8080";
export const PATH_AUTH = SERVER_HOST + "/auth";
export const PATH_LOGOUT = SERVER_HOST + "/signout";
export const PATH_API_USER = SERVER_HOST + "/api/user";
export const PATH_API_USERS = SERVER_HOST + "/api/users";
export const PATH_API_SKILLS = SERVER_HOST + "/api/skills";
export const PATH_REGISTRATION = SERVER_HOST + "/registration";
export const IMAGE_PATH = SERVER_HOST + "/images/";

//constants
export const TOKEN = "token";
export const JWT_HEADER = "Authorization";
export const ROLES = "authorities";

