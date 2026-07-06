/*--------------------------------------------------------------------------
■マップ上の特定地形から「身支度」コマンドにアクセスする ver 1.0

■作成者
KuMar(クマー)

■概要
キュウブ氏の「特定地形の上でストックにアクセスできるようになる」と
「ストックとユニット交換画面をまとめる」をブリッジするプラグインです。
これを入れる事でマップ上で「身支度」画面を表示する事が出来ます。

■更新履歴
ver 1.0 (2026/07/06)
初版公開

■対応バージョン
SRPG Studio Version:1.315

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"KuMar"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/

(function() {

var alias = UnitCommand.Stock.openCommand;

UnitCommand.Stock.openCommand = function() {

    var screenParam = ScreenBuilder.buildStockItemTrade();

    screenParam.unit = this.getCommandTarget();

    // 全プレイヤーユニットを渡す
    screenParam.unitList = PlayerList.getAliveDefaultList();

    this._stockItemTradeScreen = createObject(CategoryStockAndUnitItemTradeScreen);
    SceneManager.addScreen(this._stockItemTradeScreen, screenParam);
};

})();