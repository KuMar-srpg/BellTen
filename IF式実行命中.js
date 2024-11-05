/*-------------------------------------------------------------------------------

■概要
  ファイアーエムブレム if形式の実行命中率を導入します。
  命中率50％以上は実行命中率、それ以下の場合は表記通りになります。
  これにより全体的に攻撃が当たりやすくなり、回避性能が少し下がります。

■23/08/09  KuMar(クマー）製作

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
-------------------------------------------------------------------------------*/



Probability.getaccuracy = function(percent) {
		var n,l,m;
		
		if (percent >= this.getMaxPercent()) {
			// 100以上は無条件にtrueを返す
			return true;
		}
		
		if (percent <= 0) {
			return false;
		}
		
		// 命中率50%以上は実行命中率
		// nは0から99の値になる
		if (percent >= 50) {
			l = this.getRandomNumber() % 100;
			m = this.getRandomNumber() % 100;
			n = Math.floor((l + m) / 2);
			root.log( '実行命中率は(' + l + '+' + m + ') /'+2+' = '+n)
			return percent >= n;
		}
		else {
			n = Math.floor(this.getRandomNumber() % 100);
			root.log( '命中率は'+n)
			return percent >= n;
		}
	}

AttackEvaluator.HitCritical.calculateHit = function(virtualActive, virtualPassive, attackEntry) {
	var percent = HitCalculator.calculateHit(virtualActive.unitSelf, virtualPassive.unitSelf, virtualActive.weapon, virtualActive.totalStatus, virtualPassive.totalStatus);
		
	return Probability.getaccuracy(percent);
}