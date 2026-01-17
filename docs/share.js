        document.getElementById('generateQRCode').addEventListener('click', function() {
            // 获取当前网页的URL
            const url = window.location.href;

            // 清空之前的二维码
            const qrcodeContainer = document.getElementById('qrcode');
            qrcodeContainer.innerHTML = '';

            // 创建二维码
            const qrcode = new QRCode(qrcodeContainer, {
                text: url,
                width: 128,
                height: 128,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
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
