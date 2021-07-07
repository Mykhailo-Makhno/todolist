import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                value={title}
                variant={"outlined"}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={"small"}
                label={'title'}
                error={error}
                helperText={error&& 'title is required'}
            />

            <IconButton
                size={"small"}
                onClick={addItem}
                color={'secondary'}>
                <AddBox fontSize={'large'}/>
            </IconButton>
            <div
                style={error ? {color: 'red'} : {display: 'none'}}> is required!
            </div>
        </div>
    );
};

export default AddItemForm;