/*--------------------------------------------------------------------------
■特効計算式変更ver 1.0

■作成者
KuMar(キュウブ氏の「特効係数変化を元に改変」)

■概要
特効の計算式を変更します。Sスタではユニットの攻撃力に係数が掛け算されますが
特に中終盤でダメージ値がインフレを起こしがちです。そこでFEでもよく見られる
武器の威力に係数をかける形式を基本として書き換えたものです。こちらはさらに
支援値にも係数がかかるため、支援補正がより重要となります。

ちなみにSRPGStudio上での特効係数は200%とした場合に、武器の威力にかけ算
される値は「3」となります(300%にすると「4」となります)。

なお、規約に従いキュウブ氏の「特効係数変化」を元に改変したプラグインです。

(以下、元のプラグインより引用)
武器のカスパラに{changeEffectiveFactor:<係数>}と入れると特効係数が上書きされる
係数が100未満の場合は武器の情報欄で"特効"ではなく"低減"と記載されるようになる

特定の敵に対して弱体化する武器、の他に
貧弱だけど通常よりも特効係数が高い武器
などの設定が可

■更新履歴
ver1.0 2026/06/22
初版

■対応バージョン
SRPG Studio Version:1.315

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"KuMar(クマー)"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/

(function() {

Ryba.EffectiveExSkillKeyword = 'Ryba_calculateAttackPower';

var alias1 = DamageCalculator.calculateAttackPower;
DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {

	var pow = AbilityCalculator.getPower(active, weapon) + CompatibleCalculator.getPower(active, passive, weapon) + SupportCalculator.getPower(totalStatus);
	var paw = CompatibleCalculator.getPower(active, passive, weapon) + SupportCalculator.getPower(totalStatus);

	 if (this.isEffective(active, passive, weapon, isCritical, trueHitValue)) {
		if (typeof weapon.custom.changeEffectiveFactor === 'number') {
			pow = pow + (paw + Math.floor(weapon.getPow())) * weapon.custom.changeEffectiveFactor / 100;
		} else {
			pow = pow + (paw + Math.floor(weapon.getPow())) * this.getEffectiveFactor();
		}
	}

	var isEffective = this.isEffective(active, passive, weapon, isCritical, trueHitValue);
    		if (isEffective) {
    			pow += Ryba.EffectiveExControl.getDamage(active, passive, weapon);
    　  }

	pow += Ryba.EffectiveExControl.getSkillDamage(active, passive, weapon, isEffective);

	return pow;
};

var alias2 = ItemSentence.Effective.drawItemSentence;
ItemSentence.Effective.drawItemSentence = function(x, y, item) {
	this._aggregationViewer.drawAggregationViewer(x, y, this._getName(item));
};

var alias3 = ItemSentence.Effective._getName;
ItemSentence.Effective._getName = function(item) {
	if (typeof item.custom.changeEffectiveFactor === 'number' && item.custom.changeEffectiveFactor < 100) {
		return "低減";// ここでは係数100未満の場合の表記を変える
	} else {
		return root.queryCommand('effective_capacity');
	}
};

})();