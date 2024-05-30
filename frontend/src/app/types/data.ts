export interface ILogin{
    mail : string ,
    password : string
}

export interface ISignup{
    mail : string , 
    username : string ,
    password : string
}

export interface IVerifyToken{
    token : string
}

export interface IGetStat{
    id : string
}

export interface IChangeGroup{
    projectId : string
    groupId : string
    taskId : string
    newGroupId : string
}

export interface IUpdateAssignee{
    projectId : string
    groupId : string
    taskId : string
    assigneeId : string
}

export interface IUpdateTitreOrDescri{
    projectId : string
    groupId : string
    taskId : string
    titre? : string
    description? : string
}

export interface IProject{
    _id? : string,
    ownerId : string ,
    titre : string ,
    description : string ,
    type : string
}

export interface IAddMember{
    mail : string ,
    projectId : string
}

export interface IAddNewGroup{
    titre : string ,
    projectId : string
}

export interface IGetTaskById {
    projectId : string
}

export interface IGetTaskInfo {
    taskId : string
    projectId : string
    groupId : string
}

export interface IAddNewItem{
    groupId : string ,
    titre : string ,
    description : string ,
    projectId : string
}