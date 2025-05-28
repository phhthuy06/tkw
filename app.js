let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})
//

const searchIcon = document.getElementById('toggleSearch');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

searchIcon.addEventListener('click', () => {
  searchInput.style.display = (searchInput.style.display === 'none' || !searchInput.style.display)
    ? 'inline-block'
    : 'none';
  if (searchInput.style.display !== 'none') {
    searchInput.focus();
  }
});

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const keyword = searchInput.value.trim().toLowerCase();
    let found = false;

    const items = document.querySelectorAll('.slider .list .item');
    const thumbs = document.querySelectorAll('.slider .thumbnail .item');

    items.forEach((item, index) => {
      const title = item.querySelector('h2')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('p:nth-of-type(2)')?.textContent.toLowerCase() || '';

      if (title.includes(keyword) || desc.includes(keyword)) {
        // Xóa trạng thái active hiện tại
        document.querySelector('.slider .list .item.active')?.classList.remove('active');
        document.querySelector('.slider .thumbnail .item.active')?.classList.remove('active');

        // Kích hoạt phần tử tìm được
        item.classList.add('active');
        thumbs[index]?.classList.add('active');

        // Đặt lại chỉ số item đang hiển thị (nếu bạn dùng biến itemActive toàn cục)
        itemActive = index;
        clearInterval(refreshInterval);  // ✅ Dừng chạy slide sau tìm kiếm
        found = true;
      }
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
// hien xanh
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  document.querySelectorAll('.menu-list-item a').forEach(link => {
    if (path.includes(link.getAttribute('href'))) {
      document.querySelectorAll('.menu-list-item').forEach(item => item.classList.remove('active'));
      link.parentElement.classList.add('active');
    }
  });
});

