import React, {memo, useState, useCallback, useMemo, useEffect} from 'react';
import Button from '@wiziwig/uikit/components/Button';
import Input from '@wiziwig/uikit/components/Input';


const UserCard = (props) => {
    const {
        modal,
    } = props;

    const [user, setUser] = useState({
        id: null,
        firstName: null,
        lastName: null,
    });

    const handleChangeUser = useCallback((name, value) => {
        setUser((values) => {
            return {
                ...values,
                [name]: value,
            }
        })
    }, []);

    const isValid = useMemo(() => !!user.id && !!user.firstName && !!user.lastName, [user]);

    useEffect(() => {
        return () => {
            setUser({
                id: null,
                firstName: null,
                lastName: null,
            });
        }
    }, []);

    return (
        <div>
            <div>
                <div>
                    <label>
                        <div>Id</div>
                        <Input
                            onChange={(e) => handleChangeUser('id', e.target.value)}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        <div>Имя</div>
                        <Input
                            onChange={(e) => handleChangeUser('firstName', e.target.value)}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        <div>Фамилия</div>
                        <Input
                            onChange={(e) => handleChangeUser('lastName', e.target.value)}
                        />
                    </label>
                </div>
                <br/>
            </div>
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        onClick={() => modal.ok(user)}
                        isDisabled={!isValid}
                        color={'orange'}
                    >
                        Создать
                    </Button>
                    &nbsp;
                    <Button
                        onClick={modal.close}
                        color={'green'}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    )
};


export default memo(UserCard);