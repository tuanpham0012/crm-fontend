const base_url = 'http://127.0.0.1:8000/api/'

export const user = {
    SIGNIN : base_url + 'account/login',
    USER_INFO : base_url + 'account/get_info',
    CHANGE_PASSWORD : base_url + 'account/change_password',
};
export const staff = {
    GET_LIST_STAFF : base_url + 'staff/get_list',
    CREATE_USER : base_url + 'staff/create_staff',
};
export const customer = {
    BASE : base_url + 'customers?page=',
    SHOW: base_url + 'customer/',
    CREATE: base_url + 'customer/',
    UPDATE: base_url + 'customer/',
    GET_TYPE: base_url + 'customer/get_type',
}