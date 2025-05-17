/*--------------------------------------------------------------------------

■概要
　ランスシステムを導入します。
　1-239氏の統Calから抜き出したものです。
　このプラグインは例えばキュウブ氏の特効係数変化と競合しますので
　それを避けるために独立させました。

■25/01/27  KuMar(クマー）製作
■25/05/17  改良
　以前のバージョンでは死闘スキルなど、戦闘回数に関係したスキルと
　競合を起こす場合があった為、対応しました。しかしその代償として
　このプラグイン単体では2回攻撃や連続スキルが可能となってしまいます。
　これを防ぎ本来のランス系武器の動作を望む場合は別のプラグイン
　"noround.js"も導入してください。

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
--------------------------------------------------------------------------*/

(function(){
var alias1 = AbilityCalculator.getPower;
	AbilityCalculator.getPower = function(unit, weapon) {		
		var pow = alias1.call(this, unit, weapon);
		var movbonus = unit.getMostResentMov();
			if(typeof weapon.custom.distance == 'number'){
				pow += weapon.custom.distance * movbonus;
			}
	return pow;

	}

})();

(function () { 
var alias1 = Calculator.calculateRoundCount; //既存の再攻撃判定処理をalias1として宣言して保存
Calculator.calculateRoundCount = function(active, passive, weapon) {  //既存の処理を上書き
	var option = root.getMetaSession().getDifficulty().getDifficultyOption(); //難易度設定[[オプション]]取得
	var activeAgi = AbilityCalculator.getAgility(active, weapon);
	var passiveAgi = AbilityCalculator.getAgility(passive, ItemControl.getEquippedWeapon(passive));

	count = alias1.call(this, active, passive, weapon);  //alias1（再攻撃判定処理）から攻撃回数を得てcountに保存

	// 再攻撃不可スキル所持判定
	if (SkillControl.getPossessionCustomSkill(active,'NOROUNDATTACK')){
			count = 1;
	}

	return count; //修正されたcountを戻り値として返す
};

})();