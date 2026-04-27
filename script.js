const myData = {
    "01": {
        title: "User-Centered Designer",
        subtitle: "UX/UI & Graphic Design",
        desc: "<b>User-Centered Designer with Technical Background...</b><br>Passionate about bridging creativity and technology...",
        img: "img/avatar.png"
    },
    "02": {
        title: "Web | Simply Merchant",
        subtitle: "Remote for USA Company",
        desc: "<b>11/2024 - 9/2025</b><br>Led end-to-end design for web platforms, user research and wireframes...",
        img: "img/cv-project-1.png" // Thay bằng ảnh dự án của bro
    },
    "03": {
        title: "User-Centered Designer",
        subtitle: "UX/UI & Graphic Design",
        desc: "<b>User-Centered Designer with Technical Background...</b><br>Passionate about bridging creativity and technology...",
        img: "img/cv-project-2.png"
    },
    "04": {
        title: "User-Centered Designer",
        subtitle: "UX/UI & Graphic Design",
        desc: "<b>User-Centered Designer with Technical Background...</b><br>Passionate about bridging creativity and technology...",
        img: "img/cv-project-3.png"
    },
    
    
    // Tương tự cho 03 và 04
};




// Chọn tất cả các nút số
const numItems = document.querySelectorAll('.num-item');

numItems.forEach(item => {
    item.addEventListener('click', () => {
        // 1. Xóa class active ở số cũ, thêm vào số vừa bấm
        document.querySelector('.num-item.active').classList.remove('active');
        item.classList.add('active');

        // 2. Lấy ID (01, 02...)
        const id = item.innerText;
        const data = myData[id];

        // 3. Cập nhật nội dung bên trái
        document.querySelector('.user-name').innerText = data.title;
        document.querySelector('.user-title').innerText = data.subtitle;
        document.querySelector('.user-description').innerHTML = data.desc;

        // 4. Cập nhật ảnh ở giữa (nếu có)
        const avatarImg = document.querySelector('.avatar-holder img');
        if(avatarImg) avatarImg.src = data.img;
    });
});