import React, {memo, useCallback, useState} from 'react';
import Button from '@wiziwig/uikit/components/Button';
import Input from "@wiziwig/uikit/components/Input";
import IconPlus from "@wiziwig/uikit/components/svg/plus.svg";


const Questions = (props) => {
    const {
        modal,
    } = props;

    const [value, setValue] = useState('');

    return (
        <div>
            <div>
                <div style={{display: 'flex'}}>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    &nbsp;
                    <Button
                        isDisabled={!value}
                        color={'orange'}
                        onClick={() => modal.ok(value)}
                    >
                        <IconPlus width={15} height={15} fill={'white'}/>
                    </Button>
                </div>
            </div>
            <br/>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    onClick={modal.close}
                    color={'green'}
                >
                    Отмена
                </Button>
            </div>
        </div>
    )
};


export default memo(Questions);