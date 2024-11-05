/*--------------------------------------------------------------------------

■概要
　カスタムスキル「潜む」を持ったユニットは地形効果による回避率が倍になります。
　スキルにキーワード(bushing)を指定してください。

■24/04/12  KuMar(クマー）製作

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
--------------------------------------------------------------------------*/

(function(){

var alias1 = AbilityCalculator.getAvoid;
AbilityCalculator.getAvoid = function(unit) {
		var avoid, terrain;
		var cls = unit.getClass();
		
		// 回避は、(速さ * 2)
		avoid = RealBonus.getSpd(unit) * 2;
		
		// クラスタイプが地形ボーナスを考慮する場合は、「地形効果」の回避率が倍になる
		if (cls.getClassType().isTerrainBonusEnabled()) {
			terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
			if (terrain !== null) {
				if (SkillControl.getPossessionCustomSkill(unit,'bushing')) {
					avoid = avoid + terrain.getAvoid()*2;
				} else {
					avoid = avoid + terrain.getAvoid();
				}
			}
		}
		
		return avoid;
	}

})();