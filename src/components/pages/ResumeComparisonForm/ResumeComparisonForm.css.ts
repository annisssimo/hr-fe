import { style } from '@vanilla-extract/css';

export const textarea = style({
    width: '500px',
    maxWidth: '600px', // Максимальная ширина 600px (можно настроить)
    height: '150px', // Увеличиваем высоту, если нужно
    padding: '10px', // Добавляем отступы для удобства
    fontSize: '16px', // Размер шрифта
    borderRadius: '8px', // Скругленные углы для красоты
    border: '1px solid #ccc', // Цвет рамки
    resize: 'vertical', // Возможность изменять высоту вручную
});
