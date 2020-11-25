import LayoutBlocks from './LayoutBlocks';
import ImageUpload from './ImageUpload';
import DeleteAlert from './DeleteAlert';
import AsideWidgets from './AsideWidgets';
import UserCard from './UserCard';
import BlockTypes from './BlockTypes';
import ProductCreator from './ProductCreator';
import Questions from './Questions';


export default {
    question: {
        title: 'Создайте опрос',
        component: Questions,
    },
    productCreator: {
        title: 'Добавьте id товаров',
        component: ProductCreator,
    },
    blockTypes: {
        title: 'Выберите тип блока',
        component: BlockTypes,
    },
    layoutBlock: {
        title: 'Выберите тип лэйаута',
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
