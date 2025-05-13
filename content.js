// 配置化广告选择器
const AD_SELECTORS = [
    'div.Banner-adTag',
    'div.AdvertImg',
    'div[class*="AdvertImg"]' // 包含防御性选择器
];

// 统一元素处理器
const processElements = () => {
    // 处理广告元素
    AD_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
            console.log(`Removed ${selector} element:`, element);
        });
    });

    // // 强制应用布局样式
    // document.querySelectorAll('div.Question-main').forEach(element => {
    //     element.style.setProperty('margin-left', '16px', 'important');
    //     element.style.setProperty('margin-right', '16px', 'important');

    // });
}

// 智能DOM监听器
const observer = new MutationObserver(mutations => {
    if (!mutations.some(m => m.addedNodes.length)) return;
    processElements();
});

// 启动监听
const initObserver = () => {
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributeFilter: ['class']
    });
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        processElements();
        initObserver();
    });
} else {
    processElements();
    initObserver();
}