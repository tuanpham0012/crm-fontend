const base_url = 'http://127.0.0.1:8000/api/'

export const home = {
    GET_BASE_DATA : base_url + 'home/get_base_data',
};

export const user = {
    SIGNIN : base_url + 'account/login',
    USER_INFO : base_url + 'account/get_info',
    CHANGE_PASSWORD : base_url + 'account/change_password'
};
export const staff = {
    BASE : base_url + 'staffs?page=',
    CREATE : base_url + 'staff/',
    SHOW: base_url + 'staff/',
    UPDATE: base_url + 'staff/',
    REMOVE_MULTIPLE_STAFF: base_url + 'staffs/remove_multiple',
    UPDATE_DEPARTMENT: base_url + 'staffs/update_department'
};
export const departments = {
    BASE : base_url + 'department/',
    CREATE: base_url + 'department/',
    UPDATE: base_url + 'department/',
    GET_STAFF: base_url + 'department/',
    UPDATE_POSITION: base_url + 'department/update_position/',
    REMOVE: base_url + 'department/remove_position/',
    ADD_STAFF: base_url + 'department/add_staff',
};
export const customer = {
    BASE : base_url + 'customers?page=',
    SHOW: base_url + 'customer/',
    CREATE: base_url + 'customer/',
    UPDATE: base_url + 'customer/',
    GET_TYPE: base_url + 'customer/get_type',
    ASSIGN_SALE: base_url + 'customer/assign_sale',
    CUSTOMER_NOTES: base_url + 'customer_notes/',
    MY_CUSTOMER: base_url + 'customer/my_customer?page=',
    SEARCH_CUSTOMER: base_url + 'customer/search_code',
    UPDATE_TYPE: base_url + 'customer/update_type',
    DELETE_MULTIPLE_CUSTOMER: base_url + 'customer/multiple_delete',
    CREATE_MUTILPLE_CUSTOMER: base_url + 'customer/multiple_create',
    CONTACT: base_url + 'contact/',
}
export const tasks = {
    BASE : base_url + 'tasks/my_task',
    SHOW : base_url + 'tasks/',
    CREATE : base_url + 'tasks/',
    UPDATE : base_url + 'tasks/',
    ACCEPT_TASK : base_url + 'tasks/accept_task/',
    ADD_STAFF : base_url + 'tasks/add_staff',
    REMOVE_STAFF : base_url + 'tasks/remove_staff',
    UPDATE_TASK_STATUS : base_url + 'tasks/update_task_status',
    UPDATE_TASK_NAME : base_url + 'tasks/update_task_name',
    UPDATE_TASK_CONTENT : base_url + 'tasks/update_task_content',
    UPDATE_CUSTOMER : base_url + 'tasks/update_customer',
    CREATE_NOTE : base_url + 'task_note/',
    UPDATE_NOTE : base_url + 'task_note/',
    DELETE_NOTE : base_url + 'task_note/',
};

export const projects = {
    BASE : base_url + 'projects?page=',
    SHOW : base_url + 'projects/',
    CREATE : base_url + 'projects/',
    UPDATE : base_url + 'projects/',
    ADD_PARTICIPANT : base_url + 'projects/add_participant/',
    DELETE_PARTICIPANT : base_url + 'projects/delete_participant/',
    CONFIRM_PARTICIPANT : base_url + 'projects/confirm_participant/',
    JOIN_PROJECT: base_url + 'projects/join/',
};

export const notification = {
    GET_LIST: base_url + 'notification/get_list',
    READ_NOTIFICATION: base_url + 'notification/',
    READ_ALL: base_url + 'notification/read_all',
};
export const send_mail = {
    SEND_BASE: base_url + 'send_mail',
    SEND_MULTIPLE: base_url + 'send_mail_multiple_customer',
}
