import { MODULE_NAME } from './enums';


export default () => {
    return {
        id: MODULE_NAME,
        reducerMap: {},
        middlewares: [],
        initialActions: [],
        finalActions: [],
    };
}