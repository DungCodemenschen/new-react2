import React from 'react'
import Task from './Task';

export default function TaskList({ todoList, onCheckBtnClick, onInputComlpeted, onTaskChange, onInputStartEditor, onRemoveBtnClick }) {
    return (
    <>
        {todoList.map((todo, i) => (
            <Task key = { todo.id }
            i = {i}
            todo = { todo }
            onCheckBtnClick = { onCheckBtnClick }
            onInputComlpeted = {onInputComlpeted}
            onTaskChange = {onTaskChange}
            onInputStartEditor = {onInputStartEditor}
            onRemoveBtnClick ={onRemoveBtnClick}
            />
        ))}
    </>
    )
}