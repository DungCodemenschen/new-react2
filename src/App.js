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
import Button from '@atlaskit/button/standard-button';
const TODO_APP_STORAGE_KEY = 'TODO_APP';


const App = () => {
  const [todoList, setTodoList] = useState([]);
  var storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  // var list2 = JSON.parse(storagedTodoList);
  var list2 = [
    {
        "id": "c56a038f-91bc-4ecf-98b0-17c6a26de9bd",
        "isTypeTtem": false,
        "name": "Agape",
        "isCompleted": false,
        "isEdited": true
    },
    {
        "id": "ca377308-82d0-4e44-bccb-19c555db45c4",
        "isTypeTtem": true,
        "name": "Wein",
        "isCompleted": false,
        "isEdited": true
    },
    {
        "id": "9a5a7f0b-a2ee-45c8-9c84-70f435ac1a82",
        "isTypeTtem": true,
        "name": "Speisen",
        "isCompleted": false,
        "isEdited": true
    },
    {
        "id": "96d74b58-af88-4f08-af45-601b927e448d",
        "isTypeTtem": true,
        "name": "Kellner oder Freunde die ausschenken",
        "isCompleted": false,
        "isEdited": true
    },
    {
        "id": "21db0133-1e37-4180-91a4-56815f4887f9",
        "isTypeTtem": true,
        "name": "eventuell Luftballone",
        "isCompleted": false,
        "isEdited": true
    },
    {
        "id": "985fc6b5-8294-453a-9a9d-2c6b3b93499c",
        "isTypeTtem": true,
        "name": "Seifenblasen oder ähnliches für den Auszug aus der Kirche",
        "isCompleted": false,
        "isEdited": true
    }
]
  console.log(list2);

  
  const onAddBtnClick = useCallback((e) => {
      setTodoList([...todoList, { id: v4(), isTypeTtem: true, name: '', isCompleted: false, isEdited: false }]);
  }, [todoList]);
  const onAddCatBtnClick = useCallback((e) => {
      setTodoList([...todoList, { id: v4(), isTypeTtem: false, name: '', isCompleted: false, isEdited: false }]);
  }, [todoList]);
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
          background-color: #00f;
          border-radius: 50%;
          width: 25px;
          height: 25px;
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
  return (
    <div className="">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            list2.splice(desI, 0, list2.splice(srcI, 1)[0]);
            // List.saveList(list);
          }
        }}
      >
        <ListContainer>
          <h1>Checkliste Hochzeit</h1>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list2.map((item, i) => (
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
                                <span className='check-icon'>
                                  <CheckIcon />
                                </span>     
                              )
                            }
                            iconAfter={
                                <div className='after-icon'>
                                    <span className='remove-icon'>
                                        <EditorCloseIcon primaryColor='#00324A' />
                                    </span>
                                    <span className='move-icon'>
                                        <EditorExpandIcon primaryColor='#00324AC7' />
                                    </span>
                                </div>
                            }
                        >
                          <DragHandle className='draghandle-icon' {...provided.dragHandleProps} />
                          <span>{item.name}</span>
                        </ButtonStyled>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      </DragDropContext>
      
      <div className="btn-group">
        <Button
            className="btn-add-cat"
            onClick = { onAddCatBtnClick } >
            <AddCircleIcon size='xlarge' primaryColor='#0ff' />
            NEUE ÜBERSCHRIFT
        </Button>
        <Button
            className="btn-add"
            onClick = { onAddBtnClick } >
            <AddCircleIcon size='xlarge' primaryColor='#00f' />
        </Button>
      </div>
    </div>
  );
};

export default App;