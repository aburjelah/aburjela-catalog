/**
 * Home Tools Catalog Store - Main Application Logic
 * Brand: أبو رجيلة / ABURJELAH
 * WhatsApp: 01554699528 (201554699528)
 */

// ==========================================================================
// Default Seed Data
// ==========================================================================
const DEFAULT_SETTINGS = {
  store_name: "أبو رجيلة",
  store_subtitle: "ABURJELAH",
  whatsapp_number: "201554699528",
  store_desc: "معرض أبو رجيلة للأدوات المنزلية ومستلزمات المطبخ والبيت العصري بأفضل الأسعار وأعلى جودة في مصر.",
  currency: "جنيه",
  default_footer: "معرض أبو رجيلة للأدوات المنزلية"
};

const DEFAULT_CATEGORIES = [
  { id: 1, name: "أدوات المطبخ", icon: "🍳" },
  { id: 2, name: "أدوات التنظيف", icon: "🧹" },
  { id: 3, name: "أدوات الغسيل", icon: "🧺" },
  { id: 4, name: "إكسسوارات المنزل", icon: "🏠" },
  { id: 5, name: "أدوات الحمام", icon: "🚿" }
];

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: "عروض التوفير الكبرى على أجهزة وأدوات المطبخ",
    subtitle: "خصومات حصرية تصل حتى 35% على أطقم الجرانيت، السكاكين وأجهزة الطهي الذكية",
    badge: "خصم خاص 🔥",
    bg_color: "linear-gradient(135deg, #1A56DB 0%, #1240A0 100%)",
    category: "أدوات المطبخ"
  },
  {
    id: 2,
    title: "كل ما يحتاجه بيتك لنظافة فائقة ولمعان يدوم",
    subtitle: "أحدث معدات ومكانس التنظيف والمماسح الدوارة لتوفير وقتك وجهدك اليومي",
    badge: "عروض حصرية ✨",
    bg_color: "linear-gradient(135deg, #0D9488 0%, #115E59 100%)",
    category: "أدوات التنظيف"
  },
  {
    id: 3,
    title: "تجهيزات ومستلزمات الحمام والمفروشات القطنية",
    subtitle: "أطقم مناشف قطنية فاخرة وموزعات صابون ذكية ودواسات ميموري فوم مميزة",
    badge: "جديد المعرض 🌟",
    bg_color: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
    category: "أدوات الحمام"
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "مكنسة كهربائية ذكية 2000 واط",
    category: "أدوات التنظيف",
    price: 1850,
    original_price: 2200,
    description: "مكنسة كهربائية بقوة شفط عالية وفلتر هيبا لتنقية الهواء ملحقة برؤوس متعددة لجميع الأرضيات والسجاد والستائر.",
    image_url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 2,
    name: "طقم حلل جرانيت تركي 10 قطع",
    category: "أدوات المطبخ",
    price: 3400,
    original_price: 4100,
    description: "طقم أواني طهي جرانيت غير لاصق متكامل مع أغطية زجاجية حرارية ومقابض عازلة للحرارة، آمن للاستخدام الصحي.",
    image_url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 3,
    name: "مقلاة تيفال أصلية غير لاصقة 28 سم",
    category: "أدوات المطبخ",
    price: 480,
    original_price: 600,
    description: "مقلاة تيفال عالية الجودة مع مؤشر حراري ذكي وتوزيع متساوٍ للحرارة لطهي صحي بأقل كمية زيت وسهلة التنظيف.",
    image_url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 4,
    name: "طباخ كهربائي محمول عين واحدة سيراميك",
    category: "أدوات المطبخ",
    price: 850,
    original_price: 1100,
    description: "موقد كهربائي مسطح سريع التسخين وتحكم رقمي بالحرارة، استهلاك موفر للطاقة ومثالي للمساحات الصغيرة والرحلات.",
    image_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 5,
    name: "طقم سكاكين مطبخ ستانلس ستيل مع حامل خشبي",
    category: "أدوات المطبخ",
    price: 690,
    original_price: 850,
    description: "طقم مكون من 6 سكاكين حادة ومقص مطبخ ومسن مع حامل خشبي فاخر مقاوم للرطوبة لحفظ السكاكين بأمان.",
    image_url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 6,
    name: "غسالة ملابس صغيرة محمولة للملابس الخفيفة",
    category: "أدوات الغسيل",
    price: 1250,
    original_price: 1500,
    description: "غسالة ذكية قابلة للطي ومزودة بحوض عصر، مناسبة لملابس الأطفال والملابس الخفيفة والسفر وتوفر استهلاك المياه.",
    image_url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 7,
    name: "مكواة بخار عمودية يدوية للملابس",
    category: "أدوات الغسيل",
    price: 580,
    original_price: 720,
    description: "مكواة بخار سريعة التسخين خلال 30 ثانية لإزالة التجاعيد وتعقيم المفروشات والستائر بسهولة دون إتلاف الأنسجة.",
    image_url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 8,
    name: "خلاط كهربائي 3 في 1 مع مطحنة وتوابل",
    category: "أدوات المطبخ",
    price: 920,
    original_price: 1150,
    description: "خلاط قوي سعة 1.5 لتر مع شفرات ستانلس قوية لسحق الثلج وتحضير العصائر ومطحنتين للحبوب والتوابل.",
    image_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 9,
    name: "توستر وصانع ساندوتشات وافل 750 واط",
    category: "أدوات المطبخ",
    price: 620,
    original_price: 780,
    description: "صانع ساندوتشات مع ألواح غير لاصقة سهلة الفك والتنظيف لتحضير وجبات إفطار مقرمشة ووافل شهي خلال دقائق.",
    image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 10,
    name: "هاند بلندر يدوي ستانلس ستيل مع مضرب",
    category: "أدوات المطبخ",
    price: 540,
    original_price: 650,
    description: "خلاط يدوي مريح متعدد السرعات مع تقنية تقليل الرذاذ لإعداد الشوربات والصلصات والأطعمة المخفوقة مباشرة في القدر.",
    image_url: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 11,
    name: "طقم مواعين وسرفيس طعام بورسلين 24 قطعة",
    category: "أدوات المطبخ",
    price: 2100,
    original_price: 2600,
    description: "طقم سفرة كامل بتصميم عصري راقٍ مقاوم للحرارة والخدش وآمن للاستخدام في الميكروويف وغسالة الأطباق.",
    image_url: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 12,
    name: "سجادة حمام ميموري فوم فائقة الامتصاص",
    category: "أدوات الحمام",
    price: 180,
    original_price: 240,
    description: "دواسة حمام ناعمة الملمس مانعة للانزلاق بقاعدة مطاطية، تجف بسرعة فائقة ومقاومة للبكتيريا والروائح.",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 13,
    name: "منظف بلاط وسيراميك مركز 3 لتر",
    category: "أدوات التنظيف",
    price: 110,
    original_price: 140,
    description: "سائل تنظيف وتلميع فائق الفعالية يزيل الدهون المستعصية والترسبات الجيرية ويعقم الأرضيات برائحة اللافندر المنعشة.",
    image_url: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 14,
    name: "طقم فوط قطن مصري 100% (4 قطع)",
    category: "أدوات الحمام",
    price: 320,
    original_price: 400,
    description: "مناشف قطنية ناعمة الملمس عالية الامتصاص، ألوان ثابتة مقاومة للغسيل المتكرر وبمقاسات متنوعة للاستخدام اليومي.",
    image_url: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 15,
    name: "موزع صابون أوتوماتيكي ذكي بمستشعر",
    category: "أدوات الحمام",
    price: 290,
    original_price: 380,
    description: "موزع صابون رغوي يعمل بالأشعة تحت الحمراء بدون لمس لحماية ونظافة كاملة، قابل لإعادة الشحن عبر USB.",
    image_url: "https://images.unsplash.com/photo-1608248597359-52834b9ef731?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 16,
    name: "منظم أرفف حمام زاوية متعدد الطبقات",
    category: "أدوات الحمام",
    price: 360,
    original_price: 450,
    description: "استاند زاوية مقاوم للصدأ بدون الحاجة لحفر جدران، يتيح تنظيم الشامبو ومستحضرات العناية مع فتحات تصريف سريعة.",
    image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 17,
    name: "مكنسة أرضية يدوية مطورة بمجرود ذاتي التنظيف",
    category: "أدوات التنظيف",
    price: 220,
    original_price: 290,
    description: "طقم مكنسة وجاروف بأسنان سيليكون لتنظيف شعيرات المكنسة من الأتربة والشعر دون الحاجة لاستخدام اليدين.",
    image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 18,
    name: "دلو تنظيف دوار مع ممسحة مايكروفايبر 360",
    category: "أدوات التنظيف",
    price: 450,
    original_price: 580,
    description: "دلو عصر هيدروليكي ستانلس ستيل مع ممسحتين بديلتين من المايكروفايبر تدور 360 درجة للوصول لأصعب الزوايا وتحت الأثاث.",
    image_url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 19,
    name: "طقم مناشف مطبخ مايكروفايبر 6 قطع",
    category: "أدوات المطبخ",
    price: 130,
    original_price: 170,
    description: "مناشف تنظيف سحرية فائقة الامتصاص تزيل الزيوت وتجفف الأطباق والأسطح دون ترك وبر أو خدوش.",
    image_url: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  },
  {
    id: 20,
    name: "حامل مناشف واستاند حمام ستانلس كروم",
    category: "إكسسوارات المنزل",
    price: 420,
    original_price: 520,
    description: "حامل مناشف جداري قابل للطي مصنوع من الستانلس ستيل الكروم المقاوم للرطوبة والصدأ مع شماعات سفلية عملية.",
    image_url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
    in_stock: true
  }
];

// ==========================================================================
// Storage Keys & State
// ==========================================================================
const STORAGE_KEYS = {
  PRODUCTS: 'aburjelah_products',
  CATEGORIES: 'aburjelah_categories',
  SETTINGS: 'aburjelah_settings',
  BANNERS: 'aburjelah_banners',
  CART: 'aburjelah_cart',
  VIEWS: 'aburjelah_views'
};

let storeSettings = {};
let allProducts = [];
let allCategories = [];
let bannerSlides = [];
let cartItems = [];

let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'newest';
let selectedProductForModal = null;
let currentSlideIndex = 0;
let slideIntervalTimer = null;

// ==========================================================================
// Storage Initialization
// ==========================================================================
function initStorage() {
  // 1. Settings
  const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!savedSettings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    storeSettings = { ...DEFAULT_SETTINGS };
  } else {
    storeSettings = JSON.parse(savedSettings);
  }

  // 2. Categories
  const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!savedCategories) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    allCategories = [...DEFAULT_CATEGORIES];
  } else {
    allCategories = JSON.parse(savedCategories);
  }

  // 3. Products
  const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!savedProducts) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    allProducts = [...DEFAULT_PRODUCTS];
  } else {
    try {
      allProducts = JSON.parse(savedProducts);
    } catch (e) {
      allProducts = [...DEFAULT_PRODUCTS];
    }
  }

  // 4. Banners
  const savedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
  if (!savedBanners) {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(DEFAULT_BANNERS));
    bannerSlides = [...DEFAULT_BANNERS];
  } else {
    bannerSlides = JSON.parse(savedBanners);
  }

  // 5. Cart
  const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch (e) {
      cartItems = [];
    }
  }

  // 6. View Counter
  let currentViews = parseInt(localStorage.getItem(STORAGE_KEYS.VIEWS) || '120', 10);
  currentViews += 1;
  localStorage.setItem(STORAGE_KEYS.VIEWS, currentViews.toString());
}

// ==========================================================================
// Core UI Update
// ==========================================================================
function applyStoreSettingsToUI() {
  const storeNameEls = document.querySelectorAll('.dyn-store-name');
  storeNameEls.forEach(el => el.textContent = storeSettings.store_name || DEFAULT_SETTINGS.store_name);

  const storeSubtitleEls = document.querySelectorAll('.dyn-store-subtitle');
  storeSubtitleEls.forEach(el => el.textContent = storeSettings.store_subtitle || DEFAULT_SETTINGS.store_subtitle);

  const storeDescEls = document.querySelectorAll('.dyn-store-desc');
  storeDescEls.forEach(el => el.textContent = storeSettings.store_desc || DEFAULT_SETTINGS.store_desc);

  const whatsappBtns = document.querySelectorAll('.dyn-whatsapp-link');
  const cleanPhone = (storeSettings.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number).replace(/[^0-9]/g, '');
  whatsappBtns.forEach(btn => {
    btn.href = `https://wa.me/${cleanPhone}`;
  });

  const footerTexts = document.querySelectorAll('.dyn-footer-name');
  footerTexts.forEach(el => el.textContent = storeSettings.default_footer || storeSettings.store_name);
}

// ==========================================================================
// Banner Slider Logic
// ==========================================================================
function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const dotsContainer = document.getElementById('heroSliderDots');
  if (!track || !dotsContainer) return;

  if (bannerSlides.length === 0) {
    bannerSlides = [...DEFAULT_BANNERS];
  }

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  bannerSlides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'slide-item';
    slideEl.style.background = slide.bg_color || 'linear-gradient(135deg, #1A56DB 0%, #1240A0 100%)';
    slideEl.innerHTML = `
      <div class="slide-content">
        ${slide.badge ? `<span class="slide-badge">${escapeHtml(slide.badge)}</span>` : ''}
        <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
        <p class="slide-subtitle">${escapeHtml(slide.subtitle)}</p>
        <button class="btn btn-accent btn-sm" onclick="filterByBannerCategory('${escapeHtml(slide.category || 'all')}')">
          <i class="fa-solid fa-bag-shopping"></i> تصفح العروض الآن
        </button>
      </div>
    `;
    track.appendChild(slideEl);

    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  currentSlideIndex = 0;
  updateSliderPosition();
  startSliderAutoplay();

  const sliderWrapper = document.querySelector('.hero-slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopSliderAutoplay);
    sliderWrapper.addEventListener('mouseleave', startSliderAutoplay);
  }
}

function updateSliderPosition() {
  const track = document.getElementById('heroSliderTrack');
  const dots = document.querySelectorAll('.slider-dots .dot');
  if (!track) return;

  // Track is in LTR to maintain exact percentage math across RTL browsers
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlideIndex);
  });
}

function nextSlide() {
  if (bannerSlides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex + 1) % bannerSlides.length;
  updateSliderPosition();
}

function prevSlide() {
  if (bannerSlides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex - 1 + bannerSlides.length) % bannerSlides.length;
  updateSliderPosition();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSliderPosition();
}

function startSliderAutoplay() {
  stopSliderAutoplay();
  slideIntervalTimer = setInterval(nextSlide, 4500);
}

function stopSliderAutoplay() {
  if (slideIntervalTimer) {
    clearInterval(slideIntervalTimer);
    slideIntervalTimer = null;
  }
}

function filterByBannerCategory(categoryName) {
  if (!categoryName || categoryName === 'all') {
    selectCategory('all');
  } else {
    selectCategory(categoryName);
  }
  const productsSection = document.getElementById('productsSection');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// Category Filter Bar
// ==========================================================================
function renderCategoryFilterTabs() {
  const bar = document.getElementById('categoriesFilterBar');
  if (!bar) return;

  // Extract unique category names from products & categories list
  const catNamesSet = new Set();
  allCategories.forEach(c => catNamesSet.add(c.name));
  allProducts.forEach(p => {
    if (p.category) catNamesSet.add(p.category.trim());
  });

  const catArray = Array.from(catNamesSet);

  let html = `
    <button class="cat-btn ${activeCategory === 'all' ? 'active' : ''}" onclick="selectCategory('all')">
      <i class="fa-solid fa-border-all"></i> جميع المنتجات (${allProducts.length})
    </button>
  `;

  catArray.forEach(catName => {
    const categoryMeta = allCategories.find(c => c.name === catName);
    const icon = categoryMeta?.icon || '📦';
    const count = allProducts.filter(p => p.category === catName).length;
    const isActive = activeCategory === catName;

    html += `
      <button class="cat-btn ${isActive ? 'active' : ''}" onclick="selectCategory('${escapeHtml(catName)}')">
        <span>${icon}</span>
        <span>${escapeHtml(catName)}</span>
        <span style="opacity:0.75; font-size:0.75rem;">(${count})</span>
      </button>
    `;
  });

  bar.innerHTML = html;
}

function selectCategory(categoryName) {
  activeCategory = categoryName;
  renderCategoryFilterTabs();
  filterAndRenderProducts();
}

// ==========================================================================
// Product Filtering & Sorting
// ==========================================================================
function filterAndRenderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productsCountDisplay');
  const resetBtn = document.getElementById('resetFiltersBtn');
  if (!grid) return;

  let filtered = [...allProducts];

  // 1. Category Filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // 2. Search Query Filter
  const q = searchQuery.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(p => {
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchCat = (p.category || '').toLowerCase().includes(q);
      return matchName || matchDesc || matchCat;
    });
  }

  // 3. Sorting
  if (currentSort === 'newest') {
    filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
  } else if (currentSort === 'price-asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ar'));
  }

  // Update Status count
  if (countEl) {
    countEl.textContent = `عرض ${filtered.length} من أصل ${allProducts.length} منتج`;
  }

  // Show/Hide Reset Filters Button
  if (resetBtn) {
    resetBtn.style.display = (activeCategory !== 'all' || q !== '') ? 'inline-block' : 'none';
  }

  // 4. Render Grid or Empty State
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="empty-state-title">لم يتم العثور على أي منتجات مطابقة</h3>
        <p class="empty-state-text">جرّب البحث بكلمات أخرى أو اختر قسماً مختلفاً من الأقسام المتاحة أعلاه.</p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">
          <i class="fa-solid fa-rotate-left"></i> إعادة تعيين الفلاتر
        </button>
      </div>
    `;
    return;
  }

  const currency = storeSettings.currency || 'جنيه';

  grid.innerHTML = filtered.map(product => {
    const hasDiscount = product.original_price && Number(product.original_price) > Number(product.price);
    const discountPercent = hasDiscount
      ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
      : 0;

    const inStock = product.in_stock === true || product.in_stock === 'true' || product.in_stock === 1 || product.in_stock === '1';

    return `
      <div class="product-card ${!inStock ? 'out-of-stock' : ''}" data-id="${product.id}">
        <div class="card-media-wrapper" onclick="openProductModal(${product.id})">
          <img
            src="${escapeHtml(product.image_url || '')}"
            alt="${escapeHtml(product.name)}"
            class="card-img"
            loading="lazy"
            onerror="handleImageFallback(this, '${escapeHtml(product.name)}')"
          />
          <div class="card-badges-container">
            ${hasDiscount ? `<span class="badge badge-discount">خصم ${discountPercent}% 🔥</span>` : ''}
            ${!inStock ? `<span class="badge badge-danger">نفد من المخزون</span>` : ''}
          </div>
          <div class="card-quick-actions">
            <button class="quick-action-btn" title="معاينة وتفاصيل" onclick="event.stopPropagation(); openProductModal(${product.id})">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button class="quick-action-btn" title="طلب مباشر عبر واتساب" onclick="event.stopPropagation(); quickOrderWhatsApp(${product.id})">
              <i class="fa-brands fa-whatsapp text-success"></i>
            </button>
          </div>
        </div>

        <div class="card-body">
          <span class="card-category">${escapeHtml(product.category || 'عام')}</span>
          <h3 class="card-title" onclick="openProductModal(${product.id})" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
          <p class="card-desc">${escapeHtml(product.description || '')}</p>

          <div class="card-pricing-row">
            <span class="card-current-price">
              ${formatPrice(product.price)} <span class="currency">${currency}</span>
            </span>
            ${hasDiscount ? `<span class="card-old-price">${formatPrice(product.original_price)} ${currency}</span>` : ''}
          </div>

          <div class="card-footer-actions">
            <button
              class="btn-card-add"
              ${!inStock ? 'disabled' : ''}
              onclick="addToCart(${product.id}, 1)"
            >
              <i class="fa-solid fa-cart-plus"></i> ${inStock ? 'أضف للسلة' : 'غير متوفر'}
            </button>
            <button class="btn-card-details" onclick="openProductModal(${product.id})" title="عرض التفاصيل">
              <i class="fa-solid fa-info"></i> تفاصيل
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';
  renderCategoryFilterTabs();
  filterAndRenderProducts();
}

function handleImageFallback(imgElement, productName) {
  imgElement.style.display = 'none';
  const initial = (productName || 'م').trim().charAt(0);
  const fallbackBox = document.createElement('div');
  fallbackBox.className = 'img-fallback-box';
  fallbackBox.innerHTML = `
    <div class="img-fallback-letter">${escapeHtml(initial)}</div>
    <span style="font-size:0.75rem; font-weight:600; color:#64748B;">أبو رجيلة للأدوات المنزلية</span>
  `;
  imgElement.parentElement.appendChild(fallbackBox);
}

// ==========================================================================
// Product Detail Modal
// ==========================================================================
function openProductModal(productId) {
  const product = allProducts.find(p => p.id === productId || p.id === Number(productId));
  if (!product) return;

  selectedProductForModal = product;
  const modal = document.getElementById('productDetailModal');
  const currency = storeSettings.currency || 'جنيه';
  const hasDiscount = product.original_price && Number(product.original_price) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
    : 0;
  const inStock = product.in_stock === true || product.in_stock === 'true' || product.in_stock === 1 || product.in_stock === '1';

  document.getElementById('modalProductCategory').textContent = product.category || 'عام';
  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductDesc').textContent = product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.';

  document.getElementById('modalCurrentPrice').innerHTML = `${formatPrice(product.price)} <span style="font-size:1rem; font-weight:600;">${currency}</span>`;
  const oldPriceEl = document.getElementById('modalOldPrice');
  if (hasDiscount) {
    oldPriceEl.textContent = `${formatPrice(product.original_price)} ${currency}`;
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  const discountBadge = document.getElementById('modalDiscountBadge');
  if (hasDiscount && discountBadge) {
    discountBadge.textContent = `خصم ${discountPercent}%`;
    discountBadge.style.display = 'inline-block';
  } else if (discountBadge) {
    discountBadge.style.display = 'none';
  }

  const stockBadge = document.getElementById('modalStockBadge');
  if (stockBadge) {
    stockBadge.className = inStock ? 'badge badge-success' : 'badge badge-danger';
    stockBadge.textContent = inStock ? 'متوفر بالمخزن جاهز للشحن' : 'غير متوفر حالياً بالمخزن';
  }

  const imgEl = document.getElementById('modalProductImg');
  if (imgEl) {
    imgEl.src = product.image_url || '';
    imgEl.alt = product.name;
  }

  const qtyInput = document.getElementById('modalQuantityInput');
  if (qtyInput) qtyInput.value = 1;

  const addBtn = document.getElementById('modalAddToCartBtn');
  if (addBtn) {
    addBtn.disabled = !inStock;
    addBtn.innerHTML = inStock ? `<i class="fa-solid fa-cart-plus"></i> إضافة إلى سلة التسوق` : `المنتج غير متوفر`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function adjustModalQty(change) {
  const qtyInput = document.getElementById('modalQuantityInput');
  if (!qtyInput) return;
  let current = parseInt(qtyInput.value, 10) || 1;
  current += change;
  if (current < 1) current = 1;
  qtyInput.value = current;
}

function addModalItemToCart() {
  if (!selectedProductForModal) return;
  const qtyInput = document.getElementById('modalQuantityInput');
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
  addToCart(selectedProductForModal.id, qty);
  closeProductModal();
}

function orderModalItemDirectWhatsApp() {
  if (!selectedProductForModal) return;
  const qtyInput = document.getElementById('modalQuantityInput');
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
  quickOrderWhatsApp(selectedProductForModal.id, qty);
}

// ==========================================================================
// Cart System
// ==========================================================================
function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById('navCartCountBadge');
  const totalQty = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  if (badge) {
    badge.textContent = totalQty;
    badge.classList.remove('pop');
    void badge.offsetWidth; // Trigger reflow
    badge.classList.add('pop');
  }
}

function addToCart(productId, quantity = 1) {
  const product = allProducts.find(p => p.id === productId || p.id === Number(productId));
  if (!product) return;

  const inStock = product.in_stock === true || product.in_stock === 'true' || product.in_stock === 1 || product.in_stock === '1';
  if (!inStock) {
    showToast('عذراً، هذا المنتج غير متوفر في المخزن حالياً', 'danger');
    return;
  }

  const existing = cartItems.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price,
      image_url: product.image_url,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح!`, 'success');
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId && item.id !== Number(productId));
  saveCart();
  showToast('تم حذف المنتج من السلة', 'warning');
}

function updateCartItemQty(productId, delta) {
  const item = cartItems.find(i => i.id === productId || i.id === Number(productId));
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function clearCart() {
  if (cartItems.length === 0) return;
  if (confirm('هل أنت متأكد من رغبتك في تفريغ سلة التسوق؟')) {
    cartItems = [];
    saveCart();
    showToast('تم تفريغ السلة بنجاح', 'warning');
  }
}

function toggleCartDrawer(open) {
  const drawerOverlay = document.getElementById('cartDrawerOverlay');
  if (!drawerOverlay) return;

  if (open === undefined) {
    drawerOverlay.classList.toggle('active');
  } else if (open) {
    drawerOverlay.classList.add('active');
  } else {
    drawerOverlay.classList.remove('active');
  }

  if (drawerOverlay.classList.contains('active')) {
    renderCartDrawer();
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cartDrawerItemsList');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');
  const footerEl = document.getElementById('cartDrawerFooter');
  if (!container || !subtotalEl) return;

  const currency = storeSettings.currency || 'جنيه';

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-cart-shopping cart-empty-icon"></i>
        <h4 style="font-weight:700; margin-bottom:0.5rem; color:var(--text-main);">سلة التسوق فارغة</h4>
        <p style="font-size:0.9rem;">لم تقم بإضافة أي منتجات للسلة بعد. تصفح الكتالوج واختر ما يلزمك!</p>
        <button class="btn btn-primary btn-sm" style="margin-top:1.25rem;" onclick="toggleCartDrawer(false)">
          تصفح المنتجات الآن
        </button>
      </div>
    `;
    subtotalEl.textContent = `0 ${currency}`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'flex';

  let totalSum = 0;
  container.innerHTML = cartItems.map(item => {
    const itemTotal = Number(item.price) * (item.quantity || 1);
    totalSum += itemTotal;

    return `
      <div class="cart-item">
        <img src="${escapeHtml(item.image_url || '')}" alt="${escapeHtml(item.name)}" class="cart-item-thumb" onerror="this.src='https://placehold.co/100x100?text=🏠'">
        <div class="cart-item-info">
          <span class="cart-item-title" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
          <span class="cart-item-price">${formatPrice(item.price)} ${currency}</span>
          <div class="cart-item-qty">
            <button class="cart-qty-btn" onclick="updateCartItemQty(${item.id}, -1)">-</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateCartItemQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.4rem;">
          <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})" title="حذف من السلة">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <span style="font-size:0.85rem; font-weight:800; color:var(--primary);">${formatPrice(itemTotal)} ${currency}</span>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.textContent = `${formatPrice(totalSum)} ${currency}`;
}

// ==========================================================================
// WhatsApp Order Message Formatting
// ==========================================================================
function sendWhatsAppCartOrder() {
  if (cartItems.length === 0) {
    showToast('السلة فارغة، أضف بعض المنتجات أولاً', 'warning');
    return;
  }

  const phone = (storeSettings.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number).replace(/[^0-9]/g, '');
  const storeName = storeSettings.store_name || DEFAULT_SETTINGS.store_name;
  const footerText = storeSettings.default_footer || "معرض أبو رجيلة للأدوات المنزلية";
  const currency = storeSettings.currency || 'جنيه';

  const customerName = document.getElementById('cartCustomerName')?.value.trim();
  const customerAddress = document.getElementById('cartCustomerAddress')?.value.trim();

  let totalSum = 0;
  let itemsText = '';

  cartItems.forEach(item => {
    const itemTotal = Number(item.price) * (item.quantity || 1);
    totalSum += itemTotal;
    itemsText += `• ${item.name} × ${item.quantity} = ${formatPrice(itemTotal)} ${currency}\n`;
  });

  let message = `🛒 *طلب جديد من ${storeName}*\n\n`;

  if (customerName) {
    message += `👤 *العميل:* ${customerName}\n`;
  }
  if (customerAddress) {
    message += `📍 *العنوان / ملاحظات:* ${customerAddress}\n`;
  }
  if (customerName || customerAddress) {
    message += `-------------------------\n`;
  }

  message += `*المنتجات المطلوبة:*\n${itemsText}\n`;
  message += `💰 *الإجمالي النهائي:* ${formatPrice(totalSum)} ${currency}\n\n`;
  message += `🙏 *شكراً لاختيارك معرضنا!*\n`;
  message += `🏠 *${footerText}*`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

function quickOrderWhatsApp(productId, quantity = 1) {
  const product = allProducts.find(p => p.id === productId || p.id === Number(productId));
  if (!product) return;

  const phone = (storeSettings.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number).replace(/[^0-9]/g, '');
  const storeName = storeSettings.store_name || DEFAULT_SETTINGS.store_name;
  const footerText = storeSettings.default_footer || "معرض أبو رجيلة للأدوات المنزلية";
  const currency = storeSettings.currency || 'جنيه';
  const total = Number(product.price) * quantity;

  let message = `🛒 *طلب سريع من ${storeName}*\n\n`;
  message += `المنتج:\n• ${product.name} × ${quantity} = ${formatPrice(total)} ${currency}\n\n`;
  message += `💰 *الإجمالي:* ${formatPrice(total)} ${currency}\n\n`;
  message += `🙏 *شكراً لاختيارك معرضنا!*\n`;
  message += `🏠 *${footerText}*`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// Toast Notification System
// ==========================================================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'danger') icon = 'fa-triangle-exclamation';
  if (type === 'warning') icon = 'fa-bell';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size:1.2rem; color:var(--${type === 'danger' ? 'danger' : type === 'success' ? 'success' : 'primary'});"></i>
    <div style="flex:1; font-weight:600; font-size:0.9rem;">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Utilities
// ==========================================================================
function formatPrice(val) {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return Number(val).toLocaleString('ar-EG');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Initialization on DOMContentLoaded
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  applyStoreSettingsToUI();
  initHeroSlider();
  renderCategoryFilterTabs();
  filterAndRenderProducts();
  updateCartBadge();

  // Search input events
  const searchInput = document.getElementById('catalogSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterAndRenderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      filterAndRenderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      filterAndRenderProducts();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      toggleCartDrawer(false);
    }
  });

  // Modal backdrop click
  const detailModal = document.getElementById('productDetailModal');
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) {
        closeProductModal();
      }
    });
  }
});
