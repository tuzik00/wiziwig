import React, {useState, useCallback} from 'react';
import Button from '@wiziwig/uikit/components/Button';
import Input from '@wiziwig/uikit/components/Input';
import IconPlus from '@wiziwig/uikit/components/svg/plus.svg';


const ProductCreator = (props) => {
    const {
        modal,
    } = props;

    const [ids, setId] = useState([]);
    const [value, setValue] = useState('');

    const handleSetId = useCallback((id) => {
        setId((items) => [...items, id]);
        setValue('');
    }, []);

    return (
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
                    onClick={() => handleSetId(value)}
                >
                    <IconPlus width={15} height={15} fill={'white'}/>
                </Button>
            </div>
            <div>
                {ids.map((item) => (
                    <>
                        <br/>
                        <div style={{border: '1px solid orange', padding: '5px', borderRadius: '5px'}}>
                            {item}
                        </div>
                    </>
                ))}
            </div>
            <br/>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    isDisabled={!ids.length}
                    onClick={() => modal.ok(ids)}
                    color={'orange'}
                >
                    Добавить
                </Button>
                &nbsp;
                <Button
                    onClick={() => {
                        modal.close();
                        setId([]);
                    }}
                    color={'green'}
                >
                    Отмена
                </Button>
            </div>
        </div>
    );
};


export default ProductCreator;