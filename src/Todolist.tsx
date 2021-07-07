import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);

    }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListID);
    const changeTodoTitle = (title: string) => props.changeTodoTitle(title, props.todoListID)
    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
            <IconButton
                style={{color: 'black'}}
                size={"small"}
                color={'primary'}
                onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={ onChangeHandler }*/}
        {/*           onKeyPress={ onKeyPressHandler }*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*</div>*/}
        <ul style={{listStyle:'none', paddingLeft:'0'}}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListID)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListID)
                    }
                    return <li key={t.id} >
                        <Checkbox
                            color={"primary"}
                            size={"small"}
                            checked={t.isDone}
                            onChange={isDoneHandler}
                        />
                        <span className={t.isDone ? 'is_done' : ''} >
                        <EditableSpan title={t.title}
                          changeTitle={changeTaskTitleHandler}
                        />
                        </span>

                        {/*<span>{t.title}</span>*/}
                        <IconButton
                            size={"small"}
                            color={'primary'}
                            onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'all' ? 'secondary' : 'primary'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style={{margin: '0 3px'}}
                size={"small"}
                variant={"contained"}
                color={props.filter === 'active' ? 'secondary' : 'primary'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                // style={{marginRight:"10px"}}
                size={"small"}
                variant={"contained"}
                color={props.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
