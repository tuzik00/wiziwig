import React, {useCallback, useRef} from 'react';

const ImageUpload = (props) => {
    const {
        modal,
    } = props;

    const inputRef = useRef(null);

    const handleChange = useCallback((e) => {
        const file = e.target.files[0];

        if (file.type.indexOf('image/') === 0) {
            const src = URL.createObjectURL(file);

            modal.ok(src);
            modal.close();

            inputRef.current.value = '';
        }
    }, []);

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
        </div>
    )
};


export default ImageUpload;