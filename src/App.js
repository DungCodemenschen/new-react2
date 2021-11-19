import React from "react";
import List from "./data";
import TodoList from './components/TodoList';
import styled, { css } from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import CheckIcon from '@atlaskit/icon/glyph/check';
import EditorExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { ListContainer, ListItem } from "./styles";
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import { DragHandle } from "./components/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button/standard-button';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
const TODO_APP_STORAGE_KEY = 'TODO_APP';


const App = () => {
  const [todoList, setTodoList] = useState([]);
  var storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  var list2 = JSON.parse(storagedTodoList);
  console.log(todoList);

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
  const ButtonStyled = styled(Button)
  `
      
      margin-top: 10px;
      text-align: left !important;
      // background-color: #f00;
      padding: 5px;

      .list-task {
          width: 100%;
          border: none;
          border-bottom: 1px dashed;
          border-radius: 0;
          float: left;
      }
      .category {
          .list-task {
              input {
                  font-size: 28px;
                  font-family: "Playfair Display",Georgia,Cambria,Times New Roman,Times,serif;
                  font-weight: bold;
                  height: 36px;
              }
          }
      }
      .textedit {
          width: calc(100% - 120px);
          position: absolute;
      }
      .textedit.category {
          width: calc(100% - 66px);
      }
      .textview.category {
          font-size: 28px;
          font-family: "Playfair Display",Georgia,Cambria,Times New Roman,Times,serif;
          font-weight: bold; 
      }
      ${p => p.isEdited && css`
          .textedit {
              display: none;
              opacity: 0;
          }
      `}
      .done-icon {
          display: inline-block;
          cursor: pointer;
          margin-top: 6px;
          background-color: #60B987;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          span {
            vertical-align: baseline;
          }
          
      }
      .check-icon {
          position: relative;
          box-shadow: inset 0 0 0 2px #00324a;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
          span {
              svg {
                  opacity: 0;
                  width: 38px;
                  height: 38px;
                  transition: 0.5s;
              }
          }
          &:hover {
              box-shadow: inset 0 0 0 2px #00f;
              span {
                  svg {
                      opacity: 1;
                      width: 38px;
                      height: 38px;
                  }
              }
          }
      }
      .after-icon {
          .remove-icon {
              // display: none;
              opacity: 0;
              transition: 0.3s;
          }
          .move-icon {
              display: inline-block;
              transform: rotate(90deg);
              cursor: move;
              opacity: 0;
          }
      }
      .css-19r5em7 {
        // background-color: #f00;
        display: flex;
        .sc-gsDKAQ {
          position: absolute;
          right: -2px;
          z-index: 1;
        }
      }
      .sc-gsDKAQ {
        position: absolute;
        right: -2px;
        z-index: 1;
      }
      
      
      ${p => p.isCompleted && css`
          text-decoration: line-through;
          .check-icon {
              box-shadow: inset 0 0 0 2px #00f;
              span {
                  color: #00f;
                  svg {
                      opacity: 1;
                      width: 38px;
                      height: 38px;
                  }
              }
          }
      `}
      &:hover{
          .check-icon {
              box-shadow: inset 0 0 0 2px #00f;
              span {
                  color: #f00;
              }
          }
          
          text-decoration: none;
          -webkit-transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
          transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
          white-space: nowrap;
          background: var(--ds-background-subtleNeutral-resting,rgba(9,30,66,0.04));
          color: var(--ds-text-highEmphasis,#42526E) !important;
          .remove-icon {
              // display: inline-block;
              opacity: 1;
          }
          ${p => p.isCompleted && css`
              text-decoration: line-through;
              .check-icon {
                  box-shadow: inset 0 0 0 2px #f00;
                  span {
                      color: #f00;
                  }
              }
          `}
      }
  `;
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
                {todoList.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <ButtonStyled shouldFitContainer
                            className='buttonstyled'
                            isCompleted={item.isCompleted}
                            isEdited={item.isEdited}
                            iconBefore={
                              item.isTypeTtem && (
                                <span className='check-icon' onClick={() => onCheckBtnClick(item.id)}>
                                  <CheckIcon />
                                </span>     
                              )
                            }
                            iconAfter={
                                <div className='after-icon'>
                                    <span className='remove-icon' onClick={() => onRemoveBtnClick(item.id)}>
                                        <EditorCloseIcon primaryColor='#00324A' />
                                    </span>
                                    <span className='move-icon'>
                                        <EditorExpandIcon primaryColor='#00324AC7' />
                                    </span>
                                </div>
                            }
                        >
                          <div
                            className={
                                !item.isTypeTtem ? (
                                    'textedit category'
                                ) :
                                (
                                  'textedit'
                                )
                            }
                            >
                              <Textfield placeholder = "neue Aufgabe..."
                              className='list-task'
                              css = { { padding: '5px 10px' } }
                              value = { item.name }
                              onChange = {(e) => onTaskChange(item.id, e.target.value)}
                              >
                              </Textfield>
                              <span className='done-icon' onClick={(e) => onInputComlpeted(item.id)}>
                                  <EditorDoneIcon primaryColor='#fff' />{item.type }
                              </span>
                            </div>
                            <span 
                              className={
                                  !item.isTypeTtem ? (
                                      'textview category'
                                  ) :
                                  (
                                      'textview'
                                  )
                              }
                              onClick={(e) => onInputStartEditor(item.id)}>
                              <DragHandle className='draghandle-icon' {...provided.dragHandleProps} />
                              <span>{item.name}</span>
                          </span>
                        </ButtonStyled>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
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