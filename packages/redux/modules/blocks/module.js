import { MODULE_NAME } from './enums';
import { reducer } from './';


export default () => {
    return {
        id: MODULE_NAME,
        reducerMap: {
            [MODULE_NAME]: reducer,
        },
        middlewares: [],
        initialActions: [],
        finalActions: [],
    };
}