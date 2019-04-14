const fixedHeader = () => {
  const workWithHeader = (headerEl) => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top >= 200) {
      headerEl.classList.add('header--fixed');
    } else {
      headerEl.classList.remove('header--fixed');
    }
  };
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    workWithHeader(header);
    window.addEventListener('scroll', () => {
      workWithHeader(header);
    });
  });
};

export default fixedHeader;
