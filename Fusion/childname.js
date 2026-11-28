/*--------------------------------------------------------------------------
■childname
(フュージョン子ユニットの名前取得スクリプト)

■作成者
KuMar(ChatGPTを活用しました)

■概要
制御文字「\fu」を使う事でフュージョン子ユニットの名前を取得する事が出来ます。

■更新履歴
ver1.0 2026/07/04
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

    var alias = MessageShowEventCommand._createMessageViewParam;

    MessageShowEventCommand._createMessageViewParam = function() {
        var param = alias.call(this);
        var unit = param.unit;
        var child;

        if (unit !== null) {
            child = FusionControl.getFusionChild(unit);

            if (child !== null) {
                param.text = param.text.replace(/\\fu/g, child.getName());
            }
            else {
                param.text = param.text.replace(/\\fu/g, "");
            }
        }
        else {
            param.text = param.text.replace(/\\fu/g, "");
        }

        return param;
    };

})();
