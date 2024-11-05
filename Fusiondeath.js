/*----------------------------------------------------------------------------

■概要
　通常（ファイアーブレムでは）救出された子ユニットは親ユニットの死亡時に
　放り出される仕様となっており、このSRPG Studioでも同様です。
　ところがこのプラグインを入れると子ユニットも同時に死亡します。
　（ほぼほぼベル天のためだけにあるプラグインです）

■24/02/20  KuMar(クマー）製作

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。自己責任で！
・クレジット明記無し　OK
・再配布、転載　OK
・SRPG Studio利用規約は遵守してください。
  
----------------------------------------------------------------------------*/


(function() {

var alias1 = ReleaseFusionFlowEntry._completeMemberData;

ReleaseFusionFlowEntry._completeMemberData = function(preAttack) {
		var generator, parentUnit, childUnit;
		var unit = preAttack.getPassiveUnit();
		
		if (unit.getHp() !== 0) {
			return EnterResult.NOTENTER;
		}
		
		parentUnit = FusionControl.getFusionParent(unit);
		if (parentUnit !== null) {
			// unitはフュージョンされているため、親から切り離す
			FusionControl.releaseChild(parentUnit);
			return EnterResult.NOTENTER;
		}
		
		// unitがフュージョンしていないため、処理を続行しない
		childUnit = FusionControl.getFusionChild(unit);
		if (childUnit === null) {
			return EnterResult.NOTENTER;
		}
		
		// 「フュージョン攻撃」でキャッチされたユニットが死亡する
		//childUnit.setSyncope(false);
		childUnit.setAliveState(AliveType.DEATH);
		
		generator = this._dynamicEvent.acquireEventGenerator();
		generator.unitFusion(unit, {}, {}, DirectionType.NULL, FusionActionType.RELEASE, false);
		
		return this._dynamicEvent.executeDynamicEvent();
	}

})();