/**
 * Home Tools Catalog Store - Admin Dashboard Logic
 * Brand: أبو رجيلة / ABURJELAH
 * WhatsApp: 01554699528 (201554699528)
 */

// Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'aburjelah_products',
  CATEGORIES: 'aburjelah_categories',
  SETTINGS: 'aburjelah_settings',
  BANNERS: 'aburjelah_banners',
  CART: 'aburjelah_cart',
  VIEWS: 'aburjelah_views'
};

// Global Admin State
let adminSettings = {};
let adminProducts = [];
let adminCategories = [];
let adminBanners = [];

let currentAdminTab = 'dashboard';
let editingProductId = null;
let editingCategoryId = null;
let editingBannerId = null;
let csvParsedRows = [];

// ==========================================================================
// Initialization & Data Loading
// ==========================================================================
function loadAdminData() {
  // Settings
  const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (savedSettings) {
    try { adminSettings = JSON.parse(savedSettings); } catch (e) { adminSettings = {}; }
  } else {
    adminSettings = {
      store_name: "أبو رجيلة",
      store_subtitle: "ABURJELAH",
      whatsapp_number: "201554699528",
      store_desc: "معرض أبو رجيلة للأدوات المنزلية ومستلزمات المطبخ والبيت العصري بأفضل الأسعار وأعلى جودة في مصر.",
      currency: "جنيه",
      default_footer: "معرض أبو رجيلة للأدوات المنزلية"
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(adminSettings));
  }

  // Categories
  const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (savedCategories) {
    try { adminCategories = JSON.parse(savedCategories); } catch (e) { adminCategories = []; }
  } else {
    adminCategories = [
      { id: 1, name: "أدوات المطبخ", icon: "🍳" },
      { id: 2, name: "أدوات التنظيف", icon: "🧹" },
      { id: 3, name: "أدوات الغسيل", icon: "🧺" },
      { id: 4, name: "إكسسوارات المنزل", icon: "🏠" },
      { id: 5, name: "أدوات الحمام", icon: "🚿" }
    ];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(adminCategories));
  }

  // Products
  const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (savedProducts) {
    try { adminProducts = JSON.parse(savedProducts); } catch (e) { adminProducts = []; }
  } else {
    // If not found, use default 20 products
    adminProducts = [
      { id: 1, name: "مكنسة كهربائية ذكية 2000 واط", category: "أدوات التنظيف", price: 1850, original_price: 2200, description: "مكنسة كهربائية بقوة شفط عالية وفلتر هيبا لتنقية الهواء ملحقة برؤوس متعددة لجميع الأرضيات والسجاد والستائر.", image_url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 2, name: "طقم حلل جرانيت تركي 10 قطع", category: "أدوات المطبخ", price: 3400, original_price: 4100, description: "طقم أواني طهي جرانيت غير لاصق متكامل مع أغطية زجاجية حرارية ومقابض عازلة للحرارة، آمن للاستخدام الصحي.", image_url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 3, name: "مقلاة تيفال أصلية غير لاصقة 28 سم", category: "أدوات المطبخ", price: 480, original_price: 600, description: "مقلاة تيفال عالية الجودة مع مؤشر حراري ذكي وتوزيع متساوٍ للحرارة لطهي صحي بأقل كمية زيت وسهلة التنظيف.", image_url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 4, name: "طباخ كهربائي محمول عين واحدة سيراميك", category: "أدوات المطبخ", price: 850, original_price: 1100, description: "موقد كهربائي مسطح سريع التسخين وتحكم رقمي بالحرارة، استهلاك موفر للطاقة ومثالي للمساحات الصغيرة والرحلات.", image_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 5, name: "طقم سكاكين مطبخ ستانلس ستيل مع حامل خشبي", category: "أدوات المطبخ", price: 690, original_price: 850, description: "طقم مكون من 6 سكاكين حادة ومقص مطبخ ومسن مع حامل خشبي فاخر مقاوم للرطوبة لحفظ السكاكين بأمان.", image_url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 6, name: "غسالة ملابس صغيرة محمولة للملابس الخفيفة", category: "أدوات الغسيل", price: 1250, original_price: 1500, description: "غسالة ذكية قابلة للطي ومزودة بحوض عصر، مناسبة لملابس الأطفال والملابس الخفيفة والسفر وتوفر استهلاك المياه.", image_url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 7, name: "مكواة بخار عمودية يدوية للملابس", category: "أدوات الغسيل", price: 580, original_price: 720, description: "مكواة بخار سريعة التسخين خلال 30 ثانية لإزالة التجاعيد وتعقيم المفروشات والستائر بسهولة دون إتلاف الأنسجة.", image_url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 8, name: "خلاط كهربائي 3 في 1 مع مطحنة وتوابل", category: "أدوات المطبخ", price: 920, original_price: 1150, description: "خلاط قوي سعة 1.5 لتر مع شفرات ستانلس قوية لسحق الثلج وتحضير العصائر ومطحنتين للحبوب والتوابل.", image_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 9, name: "توستر وصانع ساندوتشات وافل 750 واط", category: "أدوات المطبخ", price: 620, original_price: 780, description: "صانع ساندوتشات مع ألواح غير لاصقة سهلة الفك والتنظيف لتحضير وجبات إفطار مقرمشة ووافل شهي خلال دقائق.", image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 10, name: "هاند بلندر يدوي ستانلس ستيل مع مضرب", category: "أدوات المطبخ", price: 540, original_price: 650, description: "خلاط يدوي مريح متعدد السرعات مع تقنية تقليل الرذاذ لإعداد الشوربات والصلصات والأطعمة المخفوقة مباشرة في القدر.", image_url: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 11, name: "طقم مواعين وسرفيس طعام بورسلين 24 قطعة", category: "أدوات المطبخ", price: 2100, original_price: 2600, description: "طقم سفرة كامل بتصميم عصري راقٍ مقاوم للحرارة والخدش وآمن للاستخدام في الميكروويف وغسالة الأطباق.", image_url: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 12, name: "سجادة حمام ميموري فوم فائقة الامتصاص", category: "أدوات الحمام", price: 180, original_price: 240, description: "دواسة حمام ناعمة الملمس مانعة للانزلاق بقاعدة مطاطية، تجف بسرعة فائقة ومقاومة للبكتيريا والروائح.", image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 13, name: "منظف بلاط وسيراميك مركز 3 لتر", category: "أدوات التنظيف", price: 110, original_price: 140, description: "سائل تنظيف وتلميع فائق الفعالية يزيل الدهون المستعصية والترسبات الجيرية ويعقم الأرضيات برائحة اللافندر المنعشة.", image_url: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 14, name: "طقم فوط قطن مصري 100% (4 قطع)", category: "أدوات الحمام", price: 320, original_price: 400, description: "مناشف قطنية ناعمة الملمس عالية الامتصاص، ألوان ثابتة مقاومة للغسيل المتكرر وبمقاسات متنوعة للاستخدام اليومي.", image_url: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 15, name: "موزع صابون أوتوماتيكي ذكي بمستشعر", category: "أدوات الحمام", price: 290, original_price: 380, description: "موزع صابون رغوي يعمل بالأشعة تحت الحمراء بدون لمس لحماية ونظافة كاملة، قابل لإعادة الشحن عبر USB.", image_url: "https://images.unsplash.com/photo-1608248597359-52834b9ef731?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 16, name: "منظم أرفف حمام زاوية متعدد الطبقات", category: "أدوات الحمام", price: 360, original_price: 450, description: "استاند زاوية مقاوم للصدأ بدون الحاجة لحفر جدران، يتيح تنظيم الشامبو ومستحضرات العناية مع فتحات تصريف سريعة.", image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 17, name: "مكنسة أرضية يدوية مطورة بمجرود ذاتي التنظيف", category: "أدوات التنظيف", price: 220, original_price: 290, description: "طقم مكنسة وجاروف بأسنان سيليكون لتنظيف شعيرات المكنسة من الأتربة والشعر دون الحاجة لاستخدام اليدين.", image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 18, name: "دلو تنظيف دوار مع ممسحة مايكروفايبر 360", category: "أدوات التنظيف", price: 450, original_price: 580, description: "دلو عصر هيدروليكي ستانلس ستيل مع ممسحتين بديلتين من المايكروفايبر تدور 360 درجة للوصول لأصعب الزوايا وتحت الأثاث.", image_url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 19, name: "طقم مناشف مطبخ مايكروفايبر 6 قطع", category: "أدوات المطبخ", price: 130, original_price: 170, description: "مناشف تنظيف سحرية فائقة الامتصاص تزيل الزيوت وتجفف الأطباق والأسطح دون ترك وبر أو خدوش.", image_url: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80", in_stock: true },
      { id: 20, name: "حامل مناشف واستاند حمام ستانلس كروم", category: "إكسسوارات المنزل", price: 420, original_price: 520, description: "حامل مناشف جداري قابل للطي مصنوع من الستانلس ستيل الكروم المقاوم للرطوبة والصدأ مع شماعات سفلية عملية.", image_url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80", in_stock: true }
    ];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
  }

  // Banners
  const savedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
  if (savedBanners) {
    try { adminBanners = JSON.parse(savedBanners); } catch (e) { adminBanners = []; }
  } else {
    adminBanners = [
      { id: 1, title: "عروض التوفير الكبرى على أجهزة وأدوات المطبخ", subtitle: "خصومات حصرية تصل حتى 35% على أطقم الجرانيت، السكاكين وأجهزة الطهي الذكية", badge: "خصم خاص 🔥", bg_color: "linear-gradient(135deg, #1A56DB 0%, #1240A0 100%)", category: "أدوات المطبخ" },
      { id: 2, title: "كل ما يحتاجه بيتك لنظافة فائقة ولمعان يدوم", subtitle: "أحدث معدات ومكانس التنظيف والمماسح الدوارة لتوفير وقتك وجهدك اليومي", badge: "عروض حصرية ✨", bg_color: "linear-gradient(135deg, #0D9488 0%, #115E59 100%)", category: "أدوات التنظيف" },
      { id: 3, title: "تجهيزات ومستلزمات الحمام والمفروشات القطنية", subtitle: "أطقم مناشف قطنية فاخرة وموزعات صابون ذكية ودواسات ميموري فوم مميزة", badge: "جديد المعرض 🌟", bg_color: "linear-gradient(135deg, #D97706 0%, #B45309 100%)", category: "أدوات الحمام" }
    ];
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(adminBanners));
  }
}

// ==========================================================================
// Tab Navigation
// ==========================================================================
function switchAdminTab(tabName) {
  currentAdminTab = tabName;

  // Nav item active class
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  // Tab panes
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Refresh tab content
  if (tabName === 'dashboard') {
    renderDashboardStats();
    renderRecentProducts();
  } else if (tabName === 'products') {
    renderProductsTable();
    populateCategorySelectOptions();
  } else if (tabName === 'categories') {
    renderCategoriesTable();
  } else if (tabName === 'banners') {
    renderBannersList();
  } else if (tabName === 'settings') {
    populateSettingsForm();
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.toggle('show');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.remove('show');
}

// ==========================================================================
// 1. Dashboard Tab
// ==========================================================================
function renderDashboardStats() {
  const totalProducts = adminProducts.length;
  const totalCats = adminCategories.length;
  const outOfStockCount = adminProducts.filter(p => !p.in_stock || p.in_stock === 'false' || p.in_stock === 0).length;
  const storeViews = parseInt(localStorage.getItem(STORAGE_KEYS.VIEWS) || '142', 10);

  document.getElementById('statTotalProducts').textContent = totalProducts.toLocaleString('ar-EG');
  document.getElementById('statTotalCategories').textContent = totalCats.toLocaleString('ar-EG');
  document.getElementById('statOutOfStock').textContent = outOfStockCount.toLocaleString('ar-EG');
  document.getElementById('statStoreViews').textContent = storeViews.toLocaleString('ar-EG');
}

function renderRecentProducts() {
  const tbody = document.getElementById('recentProductsTableBody');
  if (!tbody) return;

  const currency = adminSettings.currency || 'جنيه';
  const recent = [...adminProducts].slice(-5).reverse();

  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4">لا توجد منتجات مسجلة بعد</td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(p => `
    <tr>
      <td>
        <img src="${escapeHtml(p.image_url || '')}" alt="${escapeHtml(p.name)}" class="admin-table-thumb" onerror="this.src='https://placehold.co/80x80?text=🏠'">
      </td>
      <td><strong>${escapeHtml(p.name)}</strong></td>
      <td><span class="badge badge-primary">${escapeHtml(p.category || 'عام')}</span></td>
      <td><strong>${Number(p.price).toLocaleString('ar-EG')} ${currency}</strong></td>
      <td>
        <span class="badge ${p.in_stock ? 'badge-success' : 'badge-danger'}">
          ${p.in_stock ? 'متوفر' : 'نفد'}
        </span>
      </td>
    </tr>
  `).join('');
}

// ==========================================================================
// 2. Products Management
// ==========================================================================
function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  const countEl = document.getElementById('productsTableCount');
  if (!tbody) return;

  const query = (document.getElementById('productSearchInput')?.value || '').trim().toLowerCase();
  const filterCat = document.getElementById('productCategoryFilter')?.value || 'all';
  const currency = adminSettings.currency || 'جنيه';

  let list = [...adminProducts];

  if (filterCat !== 'all') {
    list = list.filter(p => p.category === filterCat);
  }

  if (query) {
    list = list.filter(p =>
      (p.name || '').toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query)
    );
  }

  if (countEl) {
    countEl.textContent = `إجمالي: ${list.length} منتج`;
  }

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:2.5rem 1rem; color:var(--text-muted);">
          <i class="fa-solid fa-box-open" style="font-size:2.5rem; margin-bottom:0.75rem; display:block;"></i>
          لم يتم العثور على منتجات مطابقة لخيارات البحث
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const inStock = p.in_stock === true || p.in_stock === 'true' || p.in_stock === 1 || p.in_stock === '1';
    return `
      <tr>
        <td>
          <input type="checkbox" class="product-row-check" value="${p.id}" onchange="updateBulkDeleteButtonState()">
        </td>
        <td>
          <img src="${escapeHtml(p.image_url || '')}" alt="${escapeHtml(p.name)}" class="admin-table-thumb" onerror="this.src='https://placehold.co/80x80?text=🏠'">
        </td>
        <td>
          <div style="font-weight:700; color:var(--text-main);">${escapeHtml(p.name)}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            ${escapeHtml(p.description || '')}
          </div>
        </td>
        <td><span class="badge badge-primary">${escapeHtml(p.category || 'عام')}</span></td>
        <td>
          <div style="font-weight:800; color:var(--primary);">${Number(p.price).toLocaleString('ar-EG')} ${currency}</div>
          ${p.original_price ? `<div style="font-size:0.75rem; text-decoration:line-through; color:var(--text-muted);">${Number(p.original_price).toLocaleString('ar-EG')} ${currency}</div>` : ''}
        </td>
        <td>
          <span class="badge ${inStock ? 'badge-success' : 'badge-danger'}">
            ${inStock ? 'متوفر' : 'غير متوفر'}
          </span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <button class="btn btn-secondary btn-sm" onclick="editProduct(${p.id})" title="تعديل المنتج">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteProduct(${p.id})" title="حذف المنتج">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Uncheck header select-all
  const checkAll = document.getElementById('selectAllProducts');
  if (checkAll) checkAll.checked = false;
  updateBulkDeleteButtonState();
}

function populateCategorySelectOptions() {
  const selects = [
    document.getElementById('productCategoryFilter'),
    document.getElementById('productFormCategory')
  ];

  selects.forEach(select => {
    if (!select) return;
    const isFilter = select.id === 'productCategoryFilter';
    let html = isFilter ? '<option value="all">جميع الأقسام</option>' : '';

    adminCategories.forEach(cat => {
      html += `<option value="${escapeHtml(cat.name)}">${cat.icon || '📦'} ${escapeHtml(cat.name)}</option>`;
    });

    select.innerHTML = html;
  });
}

function openAddProductModal() {
  editingProductId = null;
  document.getElementById('productModalTitle').textContent = 'إضافة منتج جديد';
  document.getElementById('productForm').reset();
  document.getElementById('productFormId').value = '';
  document.getElementById('productFormStock').checked = true;
  document.getElementById('productImagePreview').src = '';
  document.getElementById('productImagePreviewBox').style.display = 'none';

  populateCategorySelectOptions();
  document.getElementById('productEditModal').classList.add('active');
}

function editProduct(productId) {
  const product = adminProducts.find(p => p.id === productId || p.id === Number(productId));
  if (!product) return;

  editingProductId = product.id;
  document.getElementById('productModalTitle').textContent = 'تعديل بيانات المنتج';
  document.getElementById('productFormId').value = product.id;
  document.getElementById('productFormName').value = product.name;
  document.getElementById('productFormPrice').value = product.price;
  document.getElementById('productFormOriginalPrice').value = product.original_price || '';
  document.getElementById('productFormDesc').value = product.description || '';
  document.getElementById('productFormImageUrl').value = product.image_url || '';

  const inStock = product.in_stock === true || product.in_stock === 'true' || product.in_stock === 1 || product.in_stock === '1';
  document.getElementById('productFormStock').checked = inStock;

  populateCategorySelectOptions();
  document.getElementById('productFormCategory').value = product.category || (adminCategories[0] ? adminCategories[0].name : '');

  // Image preview
  updateImagePreview(product.image_url);

  document.getElementById('productEditModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productEditModal').classList.remove('active');
}

function updateImagePreview(url) {
  const previewBox = document.getElementById('productImagePreviewBox');
  const previewImg = document.getElementById('productImagePreview');
  if (!previewBox || !previewImg) return;

  if (url && url.trim().length > 5) {
    previewImg.src = url;
    previewBox.style.display = 'block';
  } else {
    previewBox.style.display = 'none';
  }
}

function saveProductFromForm(event) {
  event.preventDefault();

  const name = document.getElementById('productFormName').value.trim();
  const category = document.getElementById('productFormCategory').value;
  const price = parseFloat(document.getElementById('productFormPrice').value);
  const originalPriceVal = document.getElementById('productFormOriginalPrice').value;
  const original_price = originalPriceVal ? parseFloat(originalPriceVal) : null;
  const description = document.getElementById('productFormDesc').value.trim();
  const image_url = document.getElementById('productFormImageUrl').value.trim();
  const in_stock = document.getElementById('productFormStock').checked;

  if (!name || isNaN(price)) {
    showAdminToast('يرجى ملء اسم المنتج وسعره بشكل صحيح', 'danger');
    return;
  }

  if (editingProductId) {
    // Edit existing
    const idx = adminProducts.findIndex(p => p.id === editingProductId || p.id === Number(editingProductId));
    if (idx !== -1) {
      adminProducts[idx] = {
        ...adminProducts[idx],
        name,
        category,
        price,
        original_price,
        description,
        image_url,
        in_stock
      };
      showAdminToast('تم تحديث بيانات المنتج بنجاح!', 'success');
    }
  } else {
    // Add new
    const newId = adminProducts.length > 0 ? Math.max(...adminProducts.map(p => Number(p.id) || 0)) + 1 : 1;
    adminProducts.unshift({
      id: newId,
      name,
      category,
      price,
      original_price,
      description,
      image_url,
      in_stock
    });
    showAdminToast('تمت إضافة المنتج الجديد بنجاح!', 'success');
  }

  // Save to localStorage
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
  closeProductModal();
  renderProductsTable();
  renderDashboardStats();
}

function deleteProduct(productId) {
  const product = adminProducts.find(p => p.id === productId || p.id === Number(productId));
  if (!product) return;

  if (confirm(`هل أنت متأكد من حذف المنتج: "${product.name}"؟`)) {
    adminProducts = adminProducts.filter(p => p.id !== productId && p.id !== Number(productId));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
    showAdminToast('تم حذف المنتج بنجاح', 'warning');
    renderProductsTable();
    renderDashboardStats();
  }
}

// Bulk Actions
function toggleSelectAllProducts(e) {
  const checked = e.target.checked;
  document.querySelectorAll('.product-row-check').forEach(cb => {
    cb.checked = checked;
  });
  updateBulkDeleteButtonState();
}

function updateBulkDeleteButtonState() {
  const selected = document.querySelectorAll('.product-row-check:checked');
  const bulkBtn = document.getElementById('bulkDeleteBtn');
  const bulkCountSpan = document.getElementById('bulkSelectedCount');
  if (bulkBtn) {
    bulkBtn.disabled = selected.length === 0;
  }
  if (bulkCountSpan) {
    bulkCountSpan.textContent = selected.length > 0 ? `(${selected.length})` : '';
  }
}

function deleteSelectedProducts() {
  const checkedBoxes = document.querySelectorAll('.product-row-check:checked');
  if (checkedBoxes.length === 0) return;

  const idsToDelete = Array.from(checkedBoxes).map(cb => Number(cb.value));
  if (confirm(`هل أنت متأكد من حذف ${idsToDelete.length} منتج محدد بشكل نهائي؟`)) {
    adminProducts = adminProducts.filter(p => !idsToDelete.includes(Number(p.id)));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
    showAdminToast(`تم حذف ${idsToDelete.length} منتج بنجاح`, 'success');
    renderProductsTable();
    renderDashboardStats();
  }
}

// ==========================================================================
// CSV / Excel Import System
// ==========================================================================
function openCsvImportModal() {
  csvParsedRows = [];
  document.getElementById('csvFileInput').value = '';
  document.getElementById('csvPreviewContainer').style.display = 'none';
  document.getElementById('csvExecuteImportBtn').disabled = true;
  document.getElementById('csvImportModal').classList.add('active');
}

function closeCsvImportModal() {
  document.getElementById('csvImportModal').classList.remove('active');
}

function handleCsvFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Use PapaParse to parse CSV with UTF-8
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    encoding: 'UTF-8',
    complete: function(results) {
      if (results.errors.length > 0) {
        console.warn('PapaParse warnings:', results.errors);
      }

      if (!results.data || results.data.length === 0) {
        showAdminToast('الملف فارغ أو لا يحتوي على صفوف صالحة', 'danger');
        return;
      }

      // Map rows
      csvParsedRows = results.data.map((row, idx) => {
        return {
          id: row.id ? Number(row.id) : (adminProducts.length + idx + 1),
          name: (row.name || row['اسم المنتج'] || 'منتج بدون اسم').trim(),
          category: (row.category || row['القسم'] || 'أدوات المطبخ').trim(),
          price: parseFloat(row.price || row['السعر'] || 0),
          original_price: row.original_price ? parseFloat(row.original_price) : null,
          description: (row.description || row['الوصف'] || '').trim(),
          image_url: (row.image_url || row['رابط الصورة'] || '').trim(),
          in_stock: (row.in_stock === 'true' || row.in_stock === true || row.in_stock === '1' || row.in_stock === 1)
        };
      });

      renderCsvPreview();
    },
    error: function(err) {
      showAdminToast('حدث خطأ أثناء قراءة ملف CSV: ' + err.message, 'danger');
    }
  });
}

function renderCsvPreview() {
  const previewBox = document.getElementById('csvPreviewContainer');
  const tbody = document.getElementById('csvPreviewTableBody');
  const countEl = document.getElementById('csvRowsCount');
  const executeBtn = document.getElementById('csvExecuteImportBtn');

  if (!previewBox || !tbody) return;

  previewBox.style.display = 'block';
  if (countEl) countEl.textContent = `تم قراءة ${csvParsedRows.length} منتج بنجاح من الملف`;
  if (executeBtn) executeBtn.disabled = false;

  // Show up to first 5 rows in preview
  const sample = csvParsedRows.slice(0, 5);
  tbody.innerHTML = sample.map(item => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td><span class="badge badge-primary">${escapeHtml(item.category)}</span></td>
      <td>${item.price} جنيه</td>
      <td>${item.original_price ? item.original_price + ' جنيه' : '-'}</td>
      <td><span class="badge ${item.in_stock ? 'badge-success' : 'badge-danger'}">${item.in_stock ? 'متوفر' : 'نفد'}</span></td>
    </tr>
  `).join('');
}

function executeCsvImport() {
  if (csvParsedRows.length === 0) return;

  const mode = document.querySelector('input[name="csvImportMode"]:checked')?.value || 'append';

  if (mode === 'replace') {
    adminProducts = [...csvParsedRows];
  } else {
    // Append and reassign IDs if duplicate
    const currentMaxId = adminProducts.length > 0 ? Math.max(...adminProducts.map(p => Number(p.id) || 0)) : 0;
    csvParsedRows.forEach((item, idx) => {
      adminProducts.push({
        ...item,
        id: currentMaxId + idx + 1
      });
    });
  }

  // Save to storage
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));

  showAdminToast(`تم استيراد ${csvParsedRows.length} منتج بنجاح!`, 'success');
  closeCsvImportModal();
  renderProductsTable();
  renderDashboardStats();
}

function downloadSampleCsv() {
  window.location.href = 'sample-products.csv';
}

function exportProductsToJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminProducts, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `aburjelah-products-backup-${new Date().toISOString().slice(0,10)}.json`);
  dlAnchor.click();
  showAdminToast('تم تصدير ملف النسخة الاحتياطية بنجاح', 'success');
}

// ==========================================================================
// 3. Categories Management
// ==========================================================================
function renderCategoriesTable() {
  const container = document.getElementById('categoriesGridContainer');
  if (!container) return;

  container.innerHTML = adminCategories.map(cat => {
    const productsCount = adminProducts.filter(p => p.category === cat.name).length;
    return `
      <div class="stat-card" style="align-items:flex-start;">
        <div style="display:flex; align-items:center; gap:0.85rem;">
          <div style="font-size:2rem; width:48px; height:48px; background:var(--bg-subtle); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center;">
            ${cat.icon || '📦'}
          </div>
          <div>
            <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-main);">${escapeHtml(cat.name)}</h4>
            <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">يحتوي على ${productsCount} منتج</span>
          </div>
        </div>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-secondary btn-sm" onclick="editCategory(${cat.id})" title="تعديل">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteCategory(${cat.id})" title="حذف">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openAddCategoryModal() {
  editingCategoryId = null;
  document.getElementById('categoryModalTitle').textContent = 'إضافة قسم جديد';
  document.getElementById('categoryFormName').value = '';
  document.getElementById('categoryFormIcon').value = '🏠';
  document.getElementById('categoryModal').classList.add('active');
}

function editCategory(catId) {
  const cat = adminCategories.find(c => c.id === catId);
  if (!cat) return;

  editingCategoryId = cat.id;
  document.getElementById('categoryModalTitle').textContent = 'تعديل بيانات القسم';
  document.getElementById('categoryFormName').value = cat.name;
  document.getElementById('categoryFormIcon').value = cat.icon || '📦';
  document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
}

function saveCategoryFromForm(e) {
  e.preventDefault();
  const name = document.getElementById('categoryFormName').value.trim();
  const icon = document.getElementById('categoryFormIcon').value.trim() || '📦';

  if (!name) {
    showAdminToast('يرجى إدخال اسم القسم', 'danger');
    return;
  }

  if (editingCategoryId) {
    const idx = adminCategories.findIndex(c => c.id === editingCategoryId);
    if (idx !== -1) {
      const oldName = adminCategories[idx].name;
      adminCategories[idx] = { id: editingCategoryId, name, icon };

      // Update products category if renamed
      adminProducts.forEach(p => {
        if (p.category === oldName) p.category = name;
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
      showAdminToast('تم تعديل بيانات القسم بنجاح', 'success');
    }
  } else {
    const newId = adminCategories.length > 0 ? Math.max(...adminCategories.map(c => c.id)) + 1 : 1;
    adminCategories.push({ id: newId, name, icon });
    showAdminToast('تمت إضافة القسم الجديد بنجاح', 'success');
  }

  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(adminCategories));
  closeCategoryModal();
  renderCategoriesTable();
  renderDashboardStats();
}

function deleteCategory(catId) {
  const cat = adminCategories.find(c => c.id === catId);
  if (!cat) return;

  const count = adminProducts.filter(p => p.category === cat.name).length;
  let confirmMsg = `هل أنت متأكد من حذف قسم "${cat.name}"؟`;
  if (count > 0) {
    confirmMsg += ` يوجد ${count} منتج مرتبط بهذا القسم، سيتم نقلها لقسم عام.`;
  }

  if (confirm(confirmMsg)) {
    adminCategories = adminCategories.filter(c => c.id !== catId);
    if (count > 0) {
      adminProducts.forEach(p => {
        if (p.category === cat.name) p.category = 'عام';
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(adminCategories));
    showAdminToast('تم حذف القسم بنجاح', 'warning');
    renderCategoriesTable();
    renderDashboardStats();
  }
}

// ==========================================================================
// 4. Banner / Slider Management
// ==========================================================================
function renderBannersList() {
  const container = document.getElementById('bannersListContainer');
  if (!container) return;

  if (adminBanners.length === 0) {
    container.innerHTML = `<p class="text-center py-4 text-muted">لا يوجد أي شرائح بنر مضافة حالياً.</p>`;
    return;
  }

  container.innerHTML = adminBanners.map((slide, index) => `
    <div class="admin-card" style="background:${slide.bg_color || '#1A56DB'}; color:#FFFFFF; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
        <span class="badge" style="background:rgba(255,255,255,0.25); color:#FFFFFF;">شريحة #${index + 1} - ${escapeHtml(slide.badge || 'بدون شارة')}</span>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-secondary btn-sm" style="background:rgba(255,255,255,0.9); color:var(--text-main);" onclick="editBannerSlide(${slide.id})">
            <i class="fa-solid fa-pen-to-square"></i> تعديل
          </button>
          <button class="btn btn-secondary btn-sm" style="background:rgba(255,255,255,0.9); color:var(--danger);" onclick="deleteBannerSlide(${slide.id})">
            <i class="fa-solid fa-trash-can"></i> حذف
          </button>
        </div>
      </div>
      <h3 style="font-size:1.35rem; font-weight:800; margin-bottom:0.4rem;">${escapeHtml(slide.title)}</h3>
      <p style="font-size:0.95rem; opacity:0.95; line-height:1.5;">${escapeHtml(slide.subtitle)}</p>
    </div>
  `).join('');
}

function openAddBannerModal() {
  editingBannerId = null;
  document.getElementById('bannerModalTitle').textContent = 'إضافة شريحة بنر جديدة';
  document.getElementById('bannerFormTitle').value = '';
  document.getElementById('bannerFormSubtitle').value = '';
  document.getElementById('bannerFormBadge').value = 'عرض خاص 🔥';
  document.getElementById('bannerFormBg').value = 'linear-gradient(135deg, #1A56DB 0%, #1240A0 100%)';
  document.getElementById('bannerModal').classList.add('active');
}

function editBannerSlide(slideId) {
  const slide = adminBanners.find(s => s.id === slideId);
  if (!slide) return;

  editingBannerId = slide.id;
  document.getElementById('bannerModalTitle').textContent = 'تعديل شريحة البنر';
  document.getElementById('bannerFormTitle').value = slide.title;
  document.getElementById('bannerFormSubtitle').value = slide.subtitle;
  document.getElementById('bannerFormBadge').value = slide.badge || '';
  document.getElementById('bannerFormBg').value = slide.bg_color || 'linear-gradient(135deg, #1A56DB 0%, #1240A0 100%)';
  document.getElementById('bannerModal').classList.add('active');
}

function closeBannerModal() {
  document.getElementById('bannerModal').classList.remove('active');
}

function saveBannerFromForm(e) {
  e.preventDefault();
  const title = document.getElementById('bannerFormTitle').value.trim();
  const subtitle = document.getElementById('bannerFormSubtitle').value.trim();
  const badge = document.getElementById('bannerFormBadge').value.trim();
  const bg_color = document.getElementById('bannerFormBg').value.trim();

  if (!title) {
    showAdminToast('يرجى إدخال عنوان الشريحة', 'danger');
    return;
  }

  if (editingBannerId) {
    const idx = adminBanners.findIndex(s => s.id === editingBannerId);
    if (idx !== -1) {
      adminBanners[idx] = { id: editingBannerId, title, subtitle, badge, bg_color };
      showAdminToast('تم تحديث شريحة البنر بنجاح', 'success');
    }
  } else {
    const newId = adminBanners.length > 0 ? Math.max(...adminBanners.map(s => s.id)) + 1 : 1;
    adminBanners.push({ id: newId, title, subtitle, badge, bg_color });
    showAdminToast('تمت إضافة شريحة البنر بنجاح', 'success');
  }

  localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(adminBanners));
  closeBannerModal();
  renderBannersList();
}

function deleteBannerSlide(slideId) {
  if (confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
    adminBanners = adminBanners.filter(s => s.id !== slideId);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(adminBanners));
    showAdminToast('تم حذف شريحة البنر', 'warning');
    renderBannersList();
  }
}

// ==========================================================================
// 5. Store Settings
// ==========================================================================
function populateSettingsForm() {
  document.getElementById('settingsStoreName').value = adminSettings.store_name || "أبو رجيلة";
  document.getElementById('settingsStoreSubtitle').value = adminSettings.store_subtitle || "ABURJELAH";
  document.getElementById('settingsWhatsapp').value = adminSettings.whatsapp_number || "201554699528";
  document.getElementById('settingsStoreDesc').value = adminSettings.store_desc || "";
  document.getElementById('settingsFooter').value = adminSettings.default_footer || "معرض أبو رجيلة للأدوات المنزلية";
  document.getElementById('settingsCurrency').value = adminSettings.currency || "جنيه";
}

function saveStoreSettings(e) {
  e.preventDefault();

  const store_name = document.getElementById('settingsStoreName').value.trim();
  const store_subtitle = document.getElementById('settingsStoreSubtitle').value.trim();
  let whatsapp_number = document.getElementById('settingsWhatsapp').value.trim();
  const store_desc = document.getElementById('settingsStoreDesc').value.trim();
  const default_footer = document.getElementById('settingsFooter').value.trim();
  const currency = document.getElementById('settingsCurrency').value.trim() || 'جنيه';

  // Ensure digits only
  whatsapp_number = whatsapp_number.replace(/[^0-9]/g, '');

  if (!store_name || !whatsapp_number) {
    showAdminToast('يرجى إدخال اسم المتجر ورقم الواتساب بشكل صحيح', 'danger');
    return;
  }

  adminSettings = {
    store_name,
    store_subtitle,
    whatsapp_number,
    store_desc,
    default_footer,
    currency
  };

  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(adminSettings));
  showAdminToast('تم حفظ إعدادات المتجر بنجاح!', 'success');
}

function resetAllStoreDataToDefaults() {
  if (confirm('تحذير: هل أنت متأكد من إعادة ضبط كامل بيانات المتجر إلى المنتجات والإعدادات الافتراضية؟ سيتم مسح أي تعديلات غير محفوظة.')) {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.BANNERS);
    loadAdminData();
    switchAdminTab('dashboard');
    showAdminToast('تمت إعادة ضبط المتجر إلى البيانات النموذجية بنجاح!', 'success');
  }
}

// ==========================================================================
// Toast Notification
// ==========================================================================
function showAdminToast(message, type = 'info') {
  let container = document.getElementById('adminToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'adminToastContainer';
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
// DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadAdminData();
  switchAdminTab('dashboard');

  // Nav click handlers
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      if (tab) switchAdminTab(tab);
    });
  });

  // Search input in products tab
  const prodSearch = document.getElementById('productSearchInput');
  if (prodSearch) {
    prodSearch.addEventListener('input', () => {
      renderProductsTable();
    });
  }

  // Category filter dropdown in products tab
  const prodFilter = document.getElementById('productCategoryFilter');
  if (prodFilter) {
    prodFilter.addEventListener('change', () => {
      renderProductsTable();
    });
  }

  // Select all checkbox
  const checkAll = document.getElementById('selectAllProducts');
  if (checkAll) {
    checkAll.addEventListener('change', toggleSelectAllProducts);
  }

  // Image URL preview update
  const imgInput = document.getElementById('productFormImageUrl');
  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      updateImagePreview(e.target.value);
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCategoryModal();
      closeBannerModal();
      closeCsvImportModal();
    }
  });
});
