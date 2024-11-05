/*-------------------------------------------------------------------------------

■概要
　フュージョンリリースのコマンドを地形によって使用不可とします。
　使用不可の地形にはカスタムパラメータ(isUnReleaseTerrain:true)を指定してください。
　またこのプラグイン使用の際は、名前未定（仮）氏の「分離禁止」を併用してください

■23/08/09  KuMar(クマー）製作

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありませんが自己責任でお願いします。
・クレジットを明記しなくても結構です（してもいいです）。
・再配布、転載も許可します。
・SRPG Studio利用規約は遵守してください。
  
-------------------------------------------------------------------------------*/

(function() {


var alias = UnitCommand.FusionRelease.isCommandDisplayable;
UnitCommand.FusionRelease.isCommandDisplayable= function() {
    var terrain;
    terrain = root.getCurrentSession().getTerrainFromPos(this.getCommandTarget().getMapX(), this.getCommandTarget().getMapY(), true);
		if( terrain.custom.isUnReleaseTerrain === true ) {
			return false;
		}

		return alias.call(this);
}


})();