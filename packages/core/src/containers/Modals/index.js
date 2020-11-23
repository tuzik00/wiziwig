import LayoutBlocks from './LayoutBlocks';
import ImageUpload from './ImageUpload';


export default {
    layoutBlock: {
        title: 'Выберите тип блока',
        component: LayoutBlocks,
    },
    imageUpload: {
        title: 'Загрузите изображение',
        component: ImageUpload,
    },
};


export {
    LayoutBlocks,
}