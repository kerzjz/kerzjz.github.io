        // 获取当前页面URL
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
