/**
 * Проверяет положенние блоков .section и проставляет классы в навигацию
 * когда блок находится в области видимости
 */
const scrollCheck = () => {
  const workWithSections = (sectionList) => {
    sectionList.forEach((el, i) => {
      const { id } = el;
      const computedHeight = +window.getComputedStyle(el, null).height.slice(0, -2);
      /* Последняя секция как правило это footer, который маленький по высоте
      по этому проверяем, если это последней элемент, то начинаем
      замечать его раньше иначе при полной прокрутке вниз
      активной навигационной ссылкой будет не ссылка на футер,
      а ссылка на предыдущую секцию
      */
      const top =
        // eslint-disable-next-line no-nested-ternary
        i === sectionList.length - 1
          ? el.offsetTop - 600
          : el.offsetTop >= 200
            ? el.offsetTop - 200
            : el.offsetTop;
      const bottom = top + computedHeight;

      // кроссбраузерная позиция прокрутки
      const scroll = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );

      // если положение прокрутки ниже начала секции(top) и выше конца секции(bottom)
      // то меняем классы активности для навигации
      if (scroll > top && scroll < bottom) {
        // Подразумевается что навигация представлена как nav > ul > li > a
        // По этому стизация активного навешивается на li.navbar__item
        document.querySelector('.navbar__item.active').classList.remove('active');
        document.querySelector(`a[href="#${id}"]`).parentElement.classList.add('active');
      }
    });
  };
  document.addEventListener('DOMContentLoaded', () => {
    const $sections = Array.prototype.slice.call(document.querySelectorAll('.section'), 0);
    workWithSections($sections);

    document.addEventListener(
      'scroll',
      () => {
        workWithSections($sections);
      },
      false,
    );
  });
};

export default scrollCheck;
