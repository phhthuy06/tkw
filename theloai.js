const sliderIntervals = {};

function initSlider(selector) {
  const slider = document.querySelector(selector);
  if (!slider) return;

  const list = slider.querySelectorAll('.list .item');
  const thumbs = slider.querySelectorAll('.thumbnail .item');
  const nextBtn = slider.querySelector('[class*="next"]');
  const prevBtn = slider.querySelector('[class*="prev"]');

  let index = 0;

  function show() {
    slider.querySelector('.list .item.active')?.classList.remove('active');
    list[index].classList.add('active');
    thumbs[index].classList.add('active');
  }

  function next() {
    index = (index + 1) % list.length;
    show();
  }

  function prev() {
    index = (index - 1 + list.length) % list.length;
    show();
  }

  function resetInterval() {
    clearInterval(sliderIntervals[selector]);
    sliderIntervals[selector] = setInterval(next, 5000);
  }

  nextBtn?.addEventListener('click', () => {
    next();
    resetInterval();
  });

  prevBtn?.addEventListener('click', () => {
    prev();
    resetInterval();
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      index = i;
      show();
      resetInterval();
    });
  });

  sliderIntervals[selector] = setInterval(next, 5000);
  show();
}

// Khởi tạo các slider theo thể loại
initSlider('.hanhdong-slider');
initSlider('.tinhcam-slider');
initSlider('.haihuoc-slider');
initSlider('.anime-slider');
initSlider('.java-slider'); // phục hồi lại phần Java

// Xử lý hiển thị thể loại theo URL
const urlParams = new URLSearchParams(window.location.search);
const genre = urlParams.get('genre');
if (genre) {
  document.querySelectorAll('.genre-section').forEach(section => {
    section.classList.remove('active');
  });
  const target = document.querySelector(`.${genre}-slider`);
  if (target) target.classList.add('active');
} else {
  document.querySelector('.hanhdong-slider')?.classList.add('active'); // thể loại mặc định
}

// ====== TÌM KIẾM ======
const searchIcon = document.getElementById('toggleSearch');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

searchIcon.addEventListener('click', () => {
  searchInput.style.display = (searchInput.style.display === 'none' || !searchInput.style.display) ? 'inline-block' : 'none';
  if (searchInput.style.display !== 'none') {
    searchInput.focus();
  }
});

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const keyword = searchInput.value.trim().toLowerCase();
    let found = false;

    document.querySelectorAll('.genre-section').forEach(section => {
      const items = section.querySelectorAll('.list .item');
      items.forEach((item, idx) => {
        const title = item.querySelector('h2')?.textContent.toLowerCase() || '';
        const desc = item.querySelector('p:nth-of-type(2)')?.textContent.toLowerCase() || '';

        if (title.includes(keyword) || desc.includes(keyword)) {
          document.querySelectorAll('.genre-section').forEach(s => s.classList.remove('active'));
          section.classList.add('active');

          section.querySelector('.list .item.active')?.classList.remove('active');
          section.querySelector('.thumbnail .item.active')?.classList.remove('active');
          item.classList.add('active');
          section.querySelectorAll('.thumbnail .item')[idx]?.classList.add('active');

          const className = section.classList[1]; // ví dụ: 'java-slider'
          clearInterval(sliderIntervals[`.${className}`] || sliderIntervals[`.${className}`.trim()]);
          found = true;
        }
      });
    });

    searchResult.textContent = found ? '' : 'Không tìm thấy phim nào.';
  }
});
//video
function openModal(videoSrc) {
const modal = document.getElementById('modal');
const trailer = document.getElementById('trailer');
const source = trailer.querySelector('source');

source.src = videoSrc;
trailer.load(); // cập nhật src mới
modal.style.display = 'block';
trailer.play();
}


function closeModal() {
const modal = document.getElementById('modal');
const trailer = document.getElementById('trailer');

trailer.pause();
trailer.currentTime = 0;
modal.style.display = 'none';

}
// mau xanh
document.addEventListener("DOMContentLoaded", function () {
const path = window.location.pathname;
document.querySelectorAll('.menu-list-item a').forEach(link => {
if (path.includes(link.getAttribute('href'))) {
  document.querySelectorAll('.menu-list-item').forEach(item => item.classList.remove('active'));
  link.parentElement.classList.add('active');
}
});
});


