export class AppConstants {

    public static readonly API = '/api';
    public static readonly LOGIN = AppConstants.API + '/auth/login';
    public static readonly LOGOUT = AppConstants.API + '/auth/logout';
    public static readonly REGISTER = AppConstants.API + '/auth/register';
    public static readonly GET_LOGIN_USER = AppConstants.API + '/auth/profile';

    public static readonly CREATE_EMPLOYEE = AppConstants.API + '/employee/save';
    public static readonly GET_ALL_EMPLOYEES = AppConstants.API + '/employee/find/all';
    public static readonly GET_EMPLOYEE = AppConstants.API + '/employee/find/';
    public static readonly DELETE_EMPLOYEE = AppConstants.API + '/employee/delete/';
    public static readonly UPDATE_EMPLOYEE = AppConstants.API + '/employee/update';

    public static readonly GET_ALL_ROLES = AppConstants.API + '/role/find/all';
    public static readonly DELETE_ROLE = AppConstants.API + '/role/delete/';
    public static readonly CREATE_ROLE = AppConstants.API + '/role/save';
    public static readonly UPDATE_ROLE = AppConstants.API + '/role/update';

    public static readonly GET_ALL_DEPARTMENTS = AppConstants.API + '/department/find/all';
    public static readonly DELETE_DEPARTMENT = AppConstants.API + '/department/delete/';
    public static readonly CREATE_DEPARTMENT = AppConstants.API + '/department/save';
    public static readonly UPDATE_DEPARTMENT = AppConstants.API + '/department/update';
    
}