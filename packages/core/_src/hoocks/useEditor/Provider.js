import React, {useReducer} from 'react';
import Context from './context';


const initializeState = {
    blocks: [],
};

export const stateReducer = (state, action) => {
    switch (action.type) {
        case 'addBlock':
            return {
                ...state,
                blocks: [
                    ...state.blocks,
                    {
                        id: state.blocks.length + 1,
                        type: action.payload.blockType,
                        props: action.payload.props,
                    }
                ]
            };
        case 'removeBlock':
            return {
                ...state,
                blocks: [
                    ...state.blocks.filter((b) => b.id !== action.payload.id)
                ]
            };
        case 'setBlockChildren':
            for (let key in state.blocks) {
                if (state.blocks[key].id === action.payload.blockId) {
                    if (!state.blocks[key].props.children) {
                        state.blocks[key].props.children = {
                            ...action.payload.children
                        }
                    } else {
                        if (!state.blocks[key].props.children.length) {
                            state.blocks[key].props.children = [
                                state.blocks[key].props.children,
                                action.payload.children,
                            ]
                        } else {
                             state.blocks[key].props.children.push(action.payload.children)
                        }
                    }
                }
            }

            return {
                ...state,
            };
        default:
            return state
    }
};

const Provider = (props) => {
    const [state, dispatch] = useReducer(stateReducer, initializeState);

    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    )
};


export default Provider;