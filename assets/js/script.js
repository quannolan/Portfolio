// ========================================================
// 1. DATA KHAI BÁO DỰ ÁN
// ========================================================
const PROJECTS_DATA = [
    {
        id: 'bdapp-web',
        title: 'BDApp Website',
        category: 'Product Design',
        image: 'assets/img/bdapp.png', // Thay đường dẫn ảnh của bro vào đây
        bgColor: '#064e3b',
        problem: 'Luồng trải nghiệm người dùng phức tạp, tỷ lệ drop-off cao ở bước onboarding.',
        solution: 'Tái cấu trúc Information Architecture, tối ưu hóa Design System trên Figma.',
        impact: 'Tăng 35% tỷ lệ hoàn tất đăng ký, giảm 20% thời gian xử lý giao diện.',
        active: false
    },
    {
        id: 'simply-merchant',
        title: 'Simply Merchant',
        category: 'Website Design',
        image: 'assets/img/simply-merchant.png', // Thay đường dẫn ảnh của bro vào đây
        bgColor: '#1e1b4b',
        problem: 'Giao diện quản lý đơn hàng và doanh thu phức tạp, khiến chủ cửa hàng khó thao tác nhanh.',
        solution: 'Thiết kế Dashboard tối giản, chuẩn hóa UI Component và luồng xử lý đơn hàng 1-click.',
        impact: 'Tối ưu 30% thời gian xử lý đơn hàng daily cho merchant.',
        active: true // Card ở giữa active
    },
    {
        id: 'gogofix-app',
        title: 'Gogofix App',
        category: 'Product Design',
        image: 'assets/img/gogofix.png', // Thay đường dẫn ảnh của bro vào đây
        bgColor: '#312e81',
        problem: 'Luồng đặt dịch vụ cứu hộ/sửa chữa chưa trực quan, khó theo dõi vị trí thợ theo thời gian thực.',
        solution: 'Tối ưu UX booking flow còn 3 bước, tích hợp Real-time Tracking Map trực quan.',
        impact: 'Tăng 40% trải nghiệm hài lòng của người dùng khi sử dụng dịch vụ khẩn cấp.',
        active: false
    }
];

// RENDER SLIDER CARDS
function renderProjects() {
    const slider = document.getElementById('slider');
    if (!slider) return;

    slider.innerHTML = PROJECTS_DATA.map(project => `
        <div class="mockup-card ${project.active ? 'active' : ''}" 
             data-id="${project.id}" 
             onmouseenter="handleCardHover(this)" 
             onclick="handleCardClick(this)">
            <div class="mockup-screen" style="background-color: ${project.bgColor}">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
                <div class="mockup-content">
                    <h4>${project.title}</h4>
                    <p>${project.category}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// RÊ CHUỘT TỚI ĐÂU -> CARD ĐÓ THÀNH ACTIVE (TO NHẤT)
function handleCardHover(card) {
    document.querySelectorAll('.mockup-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const selectedId = card.getAttribute('data-id');
    PROJECTS_DATA.forEach(p => p.active = (p.id === selectedId));
}

// BẤM VÀO CARD ACTIVE ĐỂ MỞ MODAL
function handleCardClick(card) {
    if (card.classList.contains('active')) {
        const id = card.getAttribute('data-id');
        openProjectModal(id);
    } else {
        handleCardHover(card);
    }
}

function moveSlide(direction) {
    const cards = Array.from(document.querySelectorAll('.mockup-card'));
    if (cards.length === 0) return;

    const currentIndex = cards.findIndex(c => c.classList.contains('active'));
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = cards.length - 1;
    if (nextIndex >= cards.length) nextIndex = 0;

    handleCardHover(cards[nextIndex]);
}

// MODAL LOGIC
function openProjectModal(id) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project) return;

    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-tag').innerText = project.category;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-problem').innerText = project.problem;
    document.getElementById('modal-solution').innerText = project.solution;
    document.getElementById('modal-impact').innerText = project.impact;

    document.getElementById('case-study-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('case-study-modal').classList.remove('active');
}

// ========================================================
// 2. CANVAS BACKGROUND INTERACTIVE
// ========================================================
const canvas = document.getElementById('interactive-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        const particleCount = Math.floor((width * height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1
            });
        }
    }

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.fill();

            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - p.x, dy = mouse.y - p.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / mouse.radius})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    initCanvas();
    animate();
}

document.addEventListener('DOMContentLoaded', renderProjects);