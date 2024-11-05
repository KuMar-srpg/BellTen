/*--------------------------------------------------------------------------

■概要
　自然治癒や毒のダメージがランダム化されます（FEに近い感覚になる）。
　widのパーセンテージでブレ幅を調整してください。

■24/08/30  KuMar(クマー）製作

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
--------------------------------------------------------------------------*/


(function() {

var alias1 = RecoveryAllFlowEntry._getRecoveryValue;
RecoveryAllFlowEntry._getRecoveryValue = function(unit){

	var skill, terrain;
	var recoveryValue = 0;
		
	skill = SkillControl.getBestPossessionSkill(unit, SkillType.AUTORECOVERY);
	if (skill !== null) {
		recoveryValue += skill.getSkillValue();			
	}
		
	terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
	if (terrain !== null) {
		recoveryValue += terrain.getAutoRecoveryValue();
	}
		
	recoveryValue += StateControl.getHpValue(unit);

	///////////////"wid"のパーセンテージだけ上下にブレる//////////////
	var wid = 50;
	var rdm = Math.floor((wid*2 +1)*Math.random());
	//////////////////////////回復量の計算////////////////////////////
	recoveryValue = recoveryValue * (100 - wid + rdm) /100 ;
	recoveryValue = Math.round(recoveryValue);
	
	return recoveryValue;

};
})();