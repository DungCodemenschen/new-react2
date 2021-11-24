import React from 'react'
import Button from '@atlaskit/button';
import styled, { css } from 'styled-components';
import CheckIcon from '@atlaskit/icon/glyph/check';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import BitbucketSourceIcon from '@atlaskit/icon/glyph/bitbucket/source';
import { DragHandle } from "./DragHandle";
import { Draggable } from "react-beautiful-dnd";
import { ListItem } from "../styles";
import EditorExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from '@atlaskit/textfield';
import OutsideAlerter from "./OutsideAlerter";
// import InlineEdit from '@atlaskit/inline-edit';
// import useState from 'react';

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
    // .in-task {
    //     width: calc(100% - 120px);
    //     position: absolute;
    // }
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
        .textview {
            display: flex;
            justify-content: space-between;
            white-space: break-spaces;
            line-height: 1.3;
            .draghandle-icon {
              position: absolute;
              top: calc(50% - 12px);
              right: -10px;
            }
        }
        .textview.category {
            .draghandle-icon {
                top: calc(50% - 22px);
            }
        }

    `}
    .done-icon {
        display: inline-block;
        cursor: pointer;
        margin-top: 2px;
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
        margin-right: 13px;
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
        .textview {
            span {
               text-decoration: line-through; 
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

export default function Task({ todo, i, onCheckBtnClick, onInputComlpeted, onTaskChange, onInputStartEditor, onRemoveBtnClick}) {
    // const [editValue, setEditValue] = useState('');
    return (
        <>
            <Draggable
            key={todo.id}
            draggableId={"draggable-" + todo.id}
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
                    isCompleted={todo.isCompleted}
                    isEdited={todo.isEdited}
                    iconBefore={
                        todo.isTypeTtem && (
                        <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>
                            <CheckIcon />
                        </span>     
                        )
                    }
                    iconAfter={
                        <div className='after-icon'>
                            <span className='remove-icon' onClick={() => onRemoveBtnClick(todo.id)}>
                                <EditorCloseIcon primaryColor='#00324A' />
                            </span>
                            {/* <span className='move-icon'>
                                <EditorExpandIcon primaryColor='#00324AC7' />
                            </span> */}
                        </div>
                    }
                >
                    <div
                    className={
                        !todo.isTypeTtem ? (
                            'textedit category'
                        ) :
                        (
                            'textedit'
                        )
                    }
                    >
                    <OutsideAlerter>
                        <Textfield placeholder = "neue Aufgabe..."
                        className='list-task'
                        css = { { padding: '5px 10px' } }
                        defaultValue = { todo.name }
                        onChange = {(e) => onTaskChange(todo.id, e.target.value)}
                        >
                        </Textfield>
                    </OutsideAlerter>
                        <span className='done-icon' onClick={(e) => onInputComlpeted(todo.id)}>
                            <EditorDoneIcon primaryColor='#fff' />{todo.type }
                        </span>
                    </div>
                    <span 
                        className={
                            !todo.isTypeTtem ? (
                                'textview category'
                            ) :
                            (
                                'textview'
                            )
                        }
                        onClick={(e) => onInputStartEditor(todo.id)}>
                        <span>{todo.name}</span>
                        <DragHandle className='draghandle-icon' {...provided.dragHandleProps} />
                    </span>
                </ButtonStyled>
                </ListItem>
            )}
            </Draggable>
        </>
    )
}