import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const ofEditMode = () => {
        if (title) {

            props.changeTitle(title)
        }
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return (
        editMode
            ? <TextField
                autoFocus
                onBlur = {ofEditMode}
                value = {title}
                onChange = {onChangeHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;