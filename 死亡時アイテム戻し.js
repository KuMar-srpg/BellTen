/*-------------------------------------------------------------------------------

■概要
  カスパラを設定したアイテムはそれを所持していたキャラ死亡した場合にも
　ストックへ戻されます。カスパラ;{"returnToStock": true}を設定してください。

■25/04/24  KuMar(クマー）製作 (Open AI Chat GPT使用)

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
-------------------------------------------------------------------------------*/



(function() {

  var _UnitProvider_setupDeadUnit = UnitProvider.setupDeadUnit;
  UnitProvider.setupDeadUnit = function(unit) {
    // 死亡前のアイテムチェック
    for (var i = 0; i < UnitItemControl.getPossessionItemCount(unit); i++) {
      var item = UnitItemControl.getItem(unit, i);
      if (item && item.custom && item.custom.returnToStock === true) {
        StockItemControl.addStockItem(item, 1);
      }
    }

    // 元の死亡処理を実行
    _UnitProvider_setupDeadUnit.call(this, unit);
  };

})();