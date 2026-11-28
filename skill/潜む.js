/*--------------------------------------------------------------------------

■概要
　カスタムスキル「潜む」を持ったユニットは地形効果による回避率が倍になります。
　スキルにキーワード(bushing)を指定してください。
  追加：スキルにキーワード(kaihi)を指定すると、回避が+50されます。
　追加2：スキルにキーワード(noavoid)を指定すると、地形ボーナスの恩恵が
	 無くなります。
　追加3：スキルにキーワード(flyer)を指定すると、クラスタイプが地形ボーナス
	 を考慮しない場合(例：飛行ユニット)も、その恩恵を受けられます。

■24/04/12  KuMar(クマー）製作
　25/07/12  新たに回避が+50になるスキルを追加
  25/08/25　新たに地形効果を受けられないスキル"noavoid"を追加
  25/09/03  新たに飛行ユニットも地形効果を受けられる"flyer"を追加

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
				} else if (SkillControl.getPossessionCustomSkill(unit,'noavoid')) {
					avoid = avoid;
				} else {
					avoid = avoid + terrain.getAvoid();
				}
			}
		// カスタムパラメータ"flyer"を持っていれば「地形効果」を受けることができる
		} else if (SkillControl.getPossessionCustomSkill(unit,'flyer')) {
			terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
			if (terrain !== null) {
				if (SkillControl.getPossessionCustomSkill(unit,'bushing')) {
					avoid = avoid + terrain.getAvoid()*2;
				} else if (SkillControl.getPossessionCustomSkill(unit,'noavoid')) {
					avoid = avoid;
				} else {
					avoid = avoid + terrain.getAvoid();
				}
			}
		}

		if (SkillControl.getPossessionCustomSkill(unit,'kaihi')) {
			return avoid + 50;
		} else if (SkillControl.getPossessionCustomSkill(unit,'Autoavoid')) { 
			return avoid + avoid;
		} else {
			return avoid;
		}
	}

})();
