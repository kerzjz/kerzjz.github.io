a/*        // 获取当前页面URL
        const currentUrl = window.location.href;
        
        // 显示当前URL
        document.getElementById('currentUrl').textContent = currentUrl;
        
        // 生成二维码
        new QRCode(document.getElementById("qrcode"), {
            text: currentUrl,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });


document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');

    copyButton.addEventListener('click', () => {
        // 获取当前页面的URL
        const url = window.location.href;

        // 使用navigator.clipboard.writeText方法复制到剪贴板
        navigator.clipboard.writeText(url)
            .then(() => {
                // 复制成功后的操作
                alert('页面网址已复制到剪贴板！');
            })
            .catch(err => {
                // 复制失败后的操作
                console.error('复制失败:', err);
                alert('复制失败，请手动复制网址。');
            });
    });
});
// 修改您的代码，监听dialog显示完成事件
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    
    copyButton.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('页面网址已复制到剪贴板！');
            })
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制网址。');
            });
    });

    // 监听mdui dialog的显示事件
    const shareDialog = document.getElementById('share');
    if (shareDialog) {
        // 使用mutationObserver监听dialog的显示状态
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const display = shareDialog.style.display;
                    const opacity = shareDialog.style.opacity;
                    
                    // 当dialog显示且透明度为1时生成二维码
                    if (display !== 'none' && opacity === '1') {
                        generateQRCode();
                        observer.disconnect(); // 生成后停止监听
                    }
                }
            });
        });
        
        observer.observe(shareDialog, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});

// 单独的二维码生成函数
function generateQRCode() {
    // 检查是否已存在二维码，避免重复生成
    const existingQR = document.querySelector('#qrcode canvas, #qrcode img');
    if (existingQR) {
        return; // 如果已存在，不再生成
    }
    
    const currentUrl = window.location.href;
    
    // 显示当前URL
    const urlElement = document.getElementById('currentUrl');
    if (urlElement) {
        urlElement.textContent = currentUrl;
    }
    
    // 生成二维码
    try {
        new QRCode(document.getElementById("qrcode"), {
            text: currentUrl,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error('二维码生成失败:', error);
    }
}*/

    document.addEventListener('DOMContentLoaded', () => {
      const copyButton = document.getElementById('copyButton');
      const panel = document.getElementById('sharePanel');

      /* 复制功能 */
      copyButton.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
          .then(() => alert('页面网址已复制到剪贴板！'))
          .catch(err => {
            console.error(err);
            alert('复制失败，请手动复制网址。');
          });
      });

      /* 面板展开后生成二维码（MDUI 提供的事件） */
      panel.addEventListener('open.mdui.panel', () => {
        if (!document.querySelector('#qrcode canvas')) {
          generateQRCode();
        }
      });
    });

    function generateQRCode() {
      const container = document.getElementById('qrcode');
      const url = window.location.href;
      container.innerHTML = '';
      document.getElementById('currentUrl').textContent = url;

      new QRCode(container, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
