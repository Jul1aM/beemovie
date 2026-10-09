function injectStyles() {
  if (document.getElementById('ss-bee-styles')) return;

  const styleNode = document.createElement('style');
  styleNode.id = 'ss-bee-styles';
  
  styleNode.innerHTML = `
    /* 1. Симметричное ровное RGB-свечение вокруг всей кнопки */
    @keyframes beeNeonGlow {
      0% { 
        box-shadow: 0 0 12px 2px rgba(255, 0, 85, 0.7); 
      }
      25% {
        box-shadow: 0 0 12px 2px rgba(255, 204, 0, 0.7);
      }
      50% { 
        box-shadow: 0 0 12px 2px rgba(0, 255, 204, 0.7); 
      }
      75% {
        box-shadow: 0 0 12px 2px rgba(153, 0, 255, 0.7);
      }
      100% { 
        box-shadow: 0 0 12px 2px rgba(255, 0, 85, 0.7); 
      }
    }

    /* 2. Замедленный горизонтальный RGB-поток для плавного эффекта текста */
    @keyframes beeFastFlow {
      0% { background-position: 0% center; }
      100% { background-position: -200% center; }
    }
  `;
  document.head.appendChild(styleNode);
}

function injectSSButton() {
  const currentUrl = window.location.href;
  if (!currentUrl.includes('/film/') && !currentUrl.includes('/series/')) return;

  if (document.getElementById('ss-player-button')) return;

  const buttonContainer = document.querySelector(
    '[class*="styles_buttonsContainer"]'
  ) || document.querySelector(
    '[class*="styles_interactionBlock"]'
  ) || document.querySelector(
    '.styles_buttonsContainer__O_76y'
  ) || document.querySelector(
    'div[class^="styles_interactionBlock"]'
  );

  if (buttonContainer) {
    injectStyles();

    const ssButton = document.createElement('button');
    ssButton.id = 'ss-player-button';
    ssButton.title = 'Смотреть на SS';
    
    ssButton.style.backgroundColor = '#141414'; 
    ssButton.style.border = 'none'; 
    ssButton.style.borderRadius = '22px'; 
    ssButton.style.padding = '0 12px'; 
    ssButton.style.height = '44px';
    ssButton.style.display = 'flex';
    ssButton.style.alignItems = 'center';
    ssButton.style.justifyContent = 'center';
    ssButton.style.marginLeft = '12px';
    ssButton.style.flexShrink = '0';
    ssButton.style.gap = '6px'; 
    ssButton.style.cursor = 'pointer'; 
    
    ssButton.style.animation = 'beeNeonGlow 4s infinite linear';
    ssButton.style.transition = 'background-color 0.2s, box-shadow 0.2s';

    // НАСТРОЙКА ИКОНКИ: Чистый статичный попкорн без анимаций скрытия
    const popcornSpan = document.createElement('span');
    popcornSpan.innerText = '🍿';
    popcornSpan.style.fontSize = '16px'; 
    popcornSpan.style.display = 'inline-flex';
    popcornSpan.style.alignItems = 'center';

    const textSpan = document.createElement('span');
    textSpan.innerText = 'Смотреть';
    textSpan.style.fontWeight = 'bold';
    textSpan.style.fontSize = '16px'; 
    
    textSpan.style.background = 'linear-gradient(90deg, #ff0055, #ffcc00, #00ffcc, #9900ff, #ff0055)';
    textSpan.style.backgroundSize = '200% auto';
    textSpan.style.webkitBackgroundClip = 'text';
    textSpan.style.webkitTextFillColor = 'transparent';
    textSpan.style.animation = 'beeFastFlow 4s linear infinite';

    ssButton.appendChild(popcornSpan);
    ssButton.appendChild(textSpan);

    ssButton.onmouseover = () => {
      ssButton.style.backgroundColor = '#222222';
      ssButton.style.animationPlayState = 'paused';
      textSpan.style.animationPlayState = 'paused';
    };
    ssButton.onmouseout = () => {
      ssButton.style.backgroundColor = '#141414';
      ssButton.style.animationPlayState = 'running';
      textSpan.style.animationPlayState = 'running';
    };

    ssButton.addEventListener('click', () => {
      if (window.location.href.includes('kinopoisk.ru')) {
        const newUrl = window.location.href.replace('kinopoisk.ru', 'sspoisk.ru');
        window.location.href = newUrl;
      }
    });

    buttonContainer.appendChild(ssButton);
  }
}

function hideAdblockBanner() {
  const banners = document.querySelectorAll('div');
  banners.forEach(banner => {
    if (banner.innerText && banner.innerText.includes('Кажется, вы используете блокировщик рекламы')) {
      const mainBannerContainer = banner.closest('[class*="styles_container"]') || banner;
      mainBannerContainer.style.display = 'none';
    }
  });
}

function handlePageChanges() {
  injectSSButton();
  hideAdblockBanner();
}

handlePageChanges();

const observer = new MutationObserver(handlePageChanges);
observer.observe(document.body, { childList: true, subtree: true });
