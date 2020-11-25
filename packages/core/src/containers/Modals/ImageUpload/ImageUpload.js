import React, {memo, useState, useCallback, useRef} from 'react';


const ImageUpload = (props) => {
    const {
        modal,
    } = props;

    const inputRef = useRef(null);
    const [viewType, setViewType] = useState('');

    const handleChange = useCallback((e) => {
        const file = e.target.files[0];

        if (file.type.indexOf('image/') === 0) {
            const src = URL.createObjectURL(file);

            if (modal.viewTypes) {
                modal.ok({src, viewType});
            } else {
                modal.ok(src);
            }

            setViewType('');
            inputRef.current.value = '';
        }
    }, [modal.viewTypes, viewType]);

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
            {modal.viewTypes && modal.viewTypes.length && (
                <div>
                    <br/>
                    <select
                        style={{
                            width: '100%',
                            border: '1px solid orange',
                            padding: '5px',
                            boxSizing: 'border-box',
                            borderRadius: '5px',
                            outline: 'none'
                        }}
                        onChange={(e) => {
                            setViewType(e.target.value);
                        }}
                    >
                        <option value={''}>
                            -----
                        </option>
                        {modal.viewTypes.map((viewType) => (
                            <option value={viewType.label}>
                                {viewType.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
};


export default memo(ImageUpload);