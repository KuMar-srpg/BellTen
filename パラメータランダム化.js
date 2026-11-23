/*--------------------------------------------------------------------------

■概要
　マップ開始時に敵ユニットのパラメータを±1します。
　(あまり大きくするとバランス崩壊するため、±1程度が良いと思います)

■26/11/20  KuMar(クマー）製作、ChatGPT利用

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
--------------------------------------------------------------------------*/

(function() {
    var alias1 = ScriptCall_AppearEventUnit;
    ScriptCall_AppearEventUnit = function(unit) {
        alias1.call(this, unit);
        
        // 敵軍（UnitType.ENEMY）のみを対象にする
        if (unit.getUnitType() === UnitType.ENEMY) {
            randomizeEnemyParams(unit);
        }
    };

    var alias2 = OpeningEventFlowEntry._completeMemberData;
    OpeningEventFlowEntry._completeMemberData = function(battleSetupScene) {
        var result = alias2.call(this, battleSetupScene);
        
        // マップ初期配置の敵リストを取得して処理
        var list = EnemyList.getAliveList();
        var count = list.getCount();
        for (var i = 0; i < count; i++) {
            randomizeEnemyParams(list.getData(i));
        }
        return result;
    };

    function randomizeEnemyParams(unit) {
        // ランダム化するパラメータの種類（0:HP, 1:力, 2:魔力, 3:技, 4:速さ, 5:幸運, 6:守備, 7:魔防）
        var paramTypes = [0, 1, 2, 3, 4, 5, 6, 7];
        
        for (var i = 0; i < paramTypes.length; i++) {
            var type = paramTypes[i];
            // -2 ～ +2 のランダムな整数を生成
            var bonus = Math.floor(Math.random() * 3) - 1; 
            var current = unit.getParamValue(type);
            var next = Math.max(0, current + bonus); // 0未満にならないよう制限
            
            // 最大HP(0)の場合は最低1を保証
            if (type === 0 && next < 1) {
                next = 1;
            }
            unit.setParamValue(type, next);
        }
        // 最大HP変動に合わせて現在HPを全回復
        unit.setHp(ParamBonus.getMhp(unit));
    }
})();