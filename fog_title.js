/*--------------------------------------------------------------------------
■fog_title
(タイトル画面フォグ演出スクリプト)

■作成者
KuMar(ChatGPTを活用しました)

■概要
タイトル画面で指定した画像をマップ上、ウィンドウの下に配置してスクロールさせます。
(三角関数を使って微振動させています)

■更新履歴
ver1.0 2026/05/20
初版

■対応バージョン
SRPG Studio Version:1.315

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"KuMar(クマー)"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/


(function() {

    var fogX = 0;
    var fogY = 0;
    var fogCounter = 0;

    var alias = TitleScene.drawSceneCycle;
    TitleScene.drawSceneCycle = function() {

        alias.call(this);

        drawTitleFog();
    };

    var drawTitleFog = function() {

	fogCounter++;

        var pic = root.getMaterialManager().createImage(
            'OriginalPicture',
            'fog_front.png'
        );

        if (!pic) {
            return;
        }

        fogX += 0.2;
	fogY = Math.sin(fogCounter*0.002) * 1.1;
	
        if (fogX >= 1920) {
            fogX = 0;
        }

	if (fogCounter*0.002 >= Math.PI) {
	    fogCounter = 0;
	}

        pic.setAlpha(150);

        pic.draw(fogX, fogY);
        pic.draw(fogX - 1920, fogY);
    };

})();