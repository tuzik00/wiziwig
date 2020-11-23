import LayoutBlocks from './LayoutBlocks';
import ImageUpload from './ImageUpload';
import DeleteAlert from './DeleteAlert';
import AsideWidgets from './AsideWidgets';
import UserCard from './UserCard';


export default {
    layoutBlock: {
        title: 'Выберите тип блока',
        component: LayoutBlocks,
    },
    imageUpload: {
        title: 'Загрузите изображение',
        component: ImageUpload,
    },
    deleteAlert: {
        title: 'Вы уверены что хотите удалить блок?',
        component: DeleteAlert,
    },
    asideWidgets: {
        title: 'Виджеты',
        component: AsideWidgets,
    },
    userCard: {
        title: 'Карточка пользователя',
        component: UserCard,
    }
};


export {
    LayoutBlocks,
}