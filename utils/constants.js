export const baseUrl = "http://localhost:5000/api/"
export const buttons ={
    OVERVIEW:{
        name:'Overview',
        icon:"M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
    },
    REPORT:{
        name:'Report',
        icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    },
    USER:{
        name:'User',
        icon:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    USERREPORT:{
        name:'User Report',
        icon:"M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    }
}
export const USER_EXPORT_COLUMNS=[
    { label: 'Call Receiver', key: 'name'},
    { label: 'Number of Calls', key: 'count'}
  ];

  export const USER_DETAIL_EXPORT_COLUMNS=[
    { label: 'Date', key: 'timeOfCall'},
    { label: 'Gender', key: 'sex'},    
    { label: 'Caller Status', key: 'callerStatus'},
    { label: 'Marital Status', key: 'maritalStatus'},    
    { label: 'Interest to join group', key: 'interestToJoinGroup'},
    { label: 'Unserviced Call', key: 'unservicedCall'},    
    { label: 'Location', key: 'location'}
  ];
  export const REPORT_DETAIL_EXPORT_COLUMNS=[
    { label: 'Date', key: 'timeOfCall'},
    { label: 'Call Receiver', key: 'agentName'},    
    { label: 'Sex', key: 'sex'},
    { label: 'Location', key: 'location'},    
    { label: 'Caller Status', key: 'interestToJoinGroup'}
    ]

