//paths
export const USER_ID = 1;
export const SERVER_HOST = "http://" + require("os").hostname() + ":8080";
export const PATH_AUTH = SERVER_HOST + "/auth";
export const PATH_LOGOUT = SERVER_HOST + "/signout";
export const PATH_API_USER = SERVER_HOST + "/api/user";
export const PATH_REGISTRATION = SERVER_HOST + "/registration";
export const IMAGE_PATH = SERVER_HOST + "/images/";
export const PATH_API_LOAN_REQUEST = SERVER_HOST + "/api/loan-request";
export const PATH_API_LOAN_REQUEST_MINE = PATH_API_LOAN_REQUEST + "/mine";
export const PATH_API_LOAN = SERVER_HOST + "/api/loan";
export const PATH_API_LOAN_MINE = PATH_API_LOAN + "/mine"

//constants
export const TOKEN = "token";
export const JWT_HEADER = "Authorization";
export const ROLES = "authorities";

