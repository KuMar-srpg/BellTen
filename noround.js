/*-------------------------------------------------------------------------------

■概要
  敏捷によらず攻撃回数が1回のみとなります（ランス系武器での使用を想定）。
　カスパラ;{returnToStock: 1}を設定してください。

■25/05/17  KuMar(クマー）製作 (Open AI Chat GPT使用)

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
-------------------------------------------------------------------------------*/

(function () {
  var alias = Calculator.calculateRoundCount;

  Calculator.calculateRoundCount = function (active, passive, weapon) {
    var count = alias.call(this, active, passive, weapon);

    // 武器に noround フラグがある場合、強制的に1回に制限
    if (weapon && weapon.custom && weapon.custom.noround === 1) {
      count = 1;
    }

    // スキルでの NOROUNDATTACK も考慮
    if (SkillControl.getPossessionCustomSkill(active, 'NOROUNDATTACK')) {
      count = 1;
    }

    return count;
  };
})();