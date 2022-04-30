const base_url = 'http://127.0.0.1:8000/api/'

export const home = {
    GET_BASE_DATA : base_url + 'home/get_base_data',
};

export const user = {
    SIGNIN : base_url + 'account/login',
    USER_INFO : base_url + 'account/get_info',
    CHANGE_PASSWORD : base_url + 'account/change_password',
};
export const staff = {
    GET_LIST_STAFF : base_url + 'staff/get_list',
    CREATE_USER : base_url + 'staff/create_staff',
};
export const departments = {
    BASE : base_url + 'department/',
    GET_STAFF: base_url + 'department/staff_department',
};
export const customer = {
    BASE : base_url + 'customers?page=',
    SHOW: base_url + 'customer/',
    CREATE: base_url + 'customer/',
    UPDATE: base_url + 'customer/',
    GET_TYPE: base_url + 'customer/get_type',
    ASSIGN_SALE: base_url + 'customer/assign_sale',
    CUSTOMER_NOTES: base_url + 'customer_notes/',
    MY_CUSTOMER: base_url + 'customer/my_customer',
    SEARCH_CUSTOMER: base_url + 'customer/search_code',
}
export const tasks = {
    BASE : base_url + 'tasks/my_task',
    SHOW : base_url + 'tasks/',
    CREATE : base_url + 'tasks/',
    ACCEPT_TASK : base_url + 'tasks/accept_task/',
    ADD_STAFF : base_url + 'tasks/add_staff',
    REMOVE_STAFF : base_url + 'tasks/remove_staff',
    UPDATE_TASK_STATUS : base_url + 'tasks/update_task_status',
    UPDATE_TASK_NAME : base_url + 'tasks/update_task_name',
    UPDATE_CUSTOMER : base_url + 'tasks/update_customer',
    CREATE_NOTE : base_url + 'task_note/',
    UPDATE_NOTE : base_url + 'task_note/',
    DELETE_NOTE : base_url + 'task_note/',
};