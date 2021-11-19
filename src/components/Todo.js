import React from 'react'
import Button from '@atlaskit/button';
import styled, { css } from 'styled-components';
import CheckIcon from '@atlaskit/icon/glyph/check';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import BitbucketSourceIcon from '@atlaskit/icon/glyph/bitbucket/source';
import EditorExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from '@atlaskit/textfield';
// import InlineEdit from '@atlaskit/inline-edit';
// import useState from 'react';

const ButtonStyled = styled(Button)
`
    margin-top: 10px;
    text-align: left;
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
        }
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

export default function Todo({ todo, onCheckBtnClick, onInputComlpeted, onTaskChange, onInputStartEditor, onRemoveBtnClick}) {
    // const [editValue, setEditValue] = useState('');
    return (
        <>
            <ButtonStyled shouldFitContainer
                isCompleted={todo.isCompleted}
                isEdited={todo.isEdited}
                iconBefore={
                        todo.isTypeItem && (
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
                        <span className='move-icon'>
                            <EditorExpandIcon primaryColor='#00324AC7' />
                        </span>
                    </div>
                }
            >
                <div
                className={
                    !todo.isTypeItem ? (
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
                    value = { todo.name }
                    onChange = {(e) => onTaskChange(todo.id, e.target.value)}
                    // elemBeforeInput = {todo.name}
                    >
                    </Textfield>
                    <span className='done-icon' onClick={(e) => onInputComlpeted(todo.id)}>
                        <EditorDoneIcon primaryColor='#fff' />{todo.type }
                    </span>
                </div>
                
                <span 
                className={
                    !todo.isTypeItem ? (
                        'textview category'
                    ) :
                     (
                        'textview'
                    )
                }
                onClick={(e) => onInputStartEditor(todo.id)}>
                    { todo.name }
                </span>
                
            </ButtonStyled>
                
            
        </>
    )
}