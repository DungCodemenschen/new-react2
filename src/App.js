import React from "react";
import TaskList from './components/TaskList';
import styled, { css } from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import { ListContainer } from "./styles";
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import Button from '@atlaskit/button/standard-button';
const TODO_APP_STORAGE_KEY = 'TODO_APP';


const App = () => {
  const [todoList, setTodoList] = useState([]);
  var storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  var list2 = JSON.parse(storagedTodoList);
  // console.log(todoList);

  useEffect(() => {
    // let storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  // const storagedTodoList = '';
    if(storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);
   
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);
  
  const onAddBtnClick = useCallback((e) => {
    setTodoList([...todoList, { id: v4(), isTypeTtem: true, name: '', isCompleted: false, isEdited: false }]);
}, [todoList]);
const onAddCatBtnClick = useCallback((e) => {
    setTodoList([...todoList, { id: v4(), isTypeTtem: false, name: '', isCompleted: false, isEdited: false }]);
}, [todoList]);

const onRemoveBtnClick = useCallback((id) => {
  todoList.forEach((todo, key) => {
    if (todo.id === id) {
      todoList.splice(key, 1);
      // console.log(todoList);
    }
  });
  setTodoList(prevState => prevState.map(todo => todo));
}, [todoList]);


const onCheckBtnClick = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo, isCompleted: (todo.isCompleted ? false : true) } : todo))
}, []);

const onInputComlpeted = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id && todo.name !== '' ? {...todo, isEdited: true } : todo))
}, []);
const onInputStartEditor = useCallback((id) => {
  setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo, isEdited: false } : todo))
}, []);

const onTaskChange = useCallback((id, name) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo,  name: name } : todo))
}, []);

const mystyle = `
  #root .btn-add {
    display: contents;
  }
  #root {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    padding: 35px;
    padding: 3.5rem;
  }
  #root .todoList-wrap {
    min-height: 200px;
    border: #00324A 2px solid;
    padding: 4px 4px 30px 4px;
  }
  #root .btn-group {
    margin-bottom: 20px;
    text-align: right;
    margin-top: -20px;
    padding-right: 50px;
  }
  #root .btn-group2 {
    clear: both;
  }
  #root .btn-group2 .btn-add-cat {
    font-family: "Mulish",sans-serif;
    color: #fff;
    padding: 15px 35px;
    display: inline-block;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    margin-bottom: 20px;
    line-height: 1.1;
    transition: 0.8s;
    text-align: center;
    width: auto;
    opacity: 1.0;
  }
  #root .btn-group .btn-add-cat {
    background-color: transparent;
  } 
  #root div[data-rbd-droppable-id="droppable-1"] {
    border: #00324A 2px solid;
    padding: 4px 4px 30px 4px;
  }
  #root div[data-rbd-droppable-id="droppable-1"] button {
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  #root .btn-save {
    font-family: "Mulish",sans-serif;
    color: #fff;
    background: #00324A;
    border: 1px solid #00324A;
    border-radius: 0;
    padding: 0 35px;
    height: 45px;
    display: inline-block;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    margin-bottom: 20px;
    margin-top: 40px;
    line-height: 45px;
    transition: 0.8s;
    text-align: center;
    width: auto;
    opacity: 1.0;
  }
  `;
  return (
    <div className="">
      <style>{mystyle}</style>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            todoList.splice(desI, 0, todoList.splice(srcI, 1)[0]);
            // List.saveList(list);
          }
        }}
      >
        <ListContainer>
          <h1>Checkliste Hochzeit</h1>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskList todoList = { todoList }
                  onCheckBtnClick = { onCheckBtnClick }
                  onInputComlpeted = {onInputComlpeted}
                  onTaskChange = {onTaskChange}
                  onInputStartEditor={onInputStartEditor}
                  onRemoveBtnClick={onRemoveBtnClick} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      <div className="btn-group">
        <Button
            className="btn-add-cat"
            onClick = { onAddCatBtnClick } >
            <AddCircleIcon size='medium' primaryColor='#60B987' />
            NEUE ÜBERSCHRIFT
        </Button>
        <Button
            className="btn-add"
            onClick = { onAddBtnClick } >
            <AddCircleIcon size='xlarge' primaryColor='#60B987' />
        </Button>
      </div>
      
      <div className="btn-group2">
          <Button appearance="primary" className="btn-save" >Checkliste speichern</Button>
      </div>
        </ListContainer>
      </DragDropContext>
      
    </div>
  );
};

export default App;