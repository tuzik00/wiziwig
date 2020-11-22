import React from 'react';

import Container from './components/Container';
import InlineToolbar from './components/InlineToolbar';
import {Provider} from './hoocks/useEditor';
import renderBlock from './renderBlock';


const App = () => {
    return (
        <div style={{paddingLeft: '40px', paddingTop: '40px'}}>
            <Provider>
                <Container renderBlock={renderBlock()}/>
                <InlineToolbar/>
            </Provider>
        </div>
    )
};


export default App;