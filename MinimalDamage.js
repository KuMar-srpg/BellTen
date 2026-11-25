/*--------------------------------------------------------------------------

■概要
　カスタムスキルでキーワード「MinimumDamage」を設定します。
  このキーワードが与えられたスキルをユニット等に与えると
  戦闘時に最低1ダメージを敵に与えるようになります。

■キーワード"MinimumDamage"

■26/11/25  KuMar(クマー）製作、ChatGPT利用

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
--------------------------------------------------------------------------*/

(function() {

var alias = DamageCalculator.validValue;

DamageCalculator.validValue = function(
    active, passive, weapon, damage
) {
    // 通常のダメージ補正を実行
    var result = alias.call(
        this,
        active,
        passive,
        weapon,
        damage
    );

    // MinimumDamageスキルの所持を確認
    if (active !== null &&
        SkillControl.getPossessionCustomSkill(
            active,
            'MinimumDamage'
        ) !== null) {

        // 最低1ダメージを保証
        if (result < 1) {
            result = 1;
        }
    }

    return result;
};

})();