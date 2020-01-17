<style lang=less>
	@import '../../assets/public.less';
	@import './ggOrder.less';

	.gg_order_wrapper .relatives input {
		background: #171B2B;
		color: #fff;
	}

	.gg_order_wrapper .relatives span {
		color: #fff;
	}

	.gg_order_wrapper .relativesdd .spanss{
		color: #fff;
	}
	
	.gg_order_wrapper {
		.aidemolizhuanquanquan{
			position: relative;
			top:3px;
			right: 20px;
			animation: RoundAndRound 2s infinite ;
			animation-timing-function:linear;
		}

		@keyframes RoundAndRound{
			0%{ transform: rotate(0deg) }
			100%{  transform: rotate(360deg) }
		}
		.alerts {
			color: #999;
			margin-left: 20px;
		}

		.demonstration {
			color: #eeeeee;
		}
		
		.cell {
			text-align: center;
		}

		.el-tabs__nav-wrap::after {
			height: 1px;
		} 

		.el-card__body {
			padding: 0 !important;
		}

		.block {
			padding-left: 0;
		}

		.order_container .content .is-active {
			height: 70px;
			line-height: 70px;
			font-size: 16px;
			font-family: "Microsoft YaHei";
			color: rgb( 255, 255, 255 );
			/* border-bottom: 6px solid #2C64F3; */
		}

		.order_container .content .is-top {
			background: #282C3D;
			z-index: 0;
		}

		.el-tabs__nav-scroll {
			height: 70px;
			line-height: 70px;
			text-indent: 5px;
		}

		.top-desc {
			width: 100%; 
			height: 10px; 
			background: #171B2B;
		}

		.second-btm {
			left: 280px;
		}

		.fourth-btm {
			left: 390px;
		}

		.header-item {
			width: 100%;
			height: 70px;
			line-height: 70px;
			overflow: hidden;
			color: #FFF;
			text-indent: 5px;
			background: #282C3D
		}

		.header-list {
			position: relative;
			float: left;
			width: 120px;
			text-align: center;
		}

		.tab-list {
			cursor: pointer;
		}

		.bottom {
			position: absolute;
			bottom: 0;
			left: calc(50% - 15px);
			display: inline-block;
			width: 30px;
			height: 6px;
			background: #2C64F3;
			z-index: 999;
		}

		.tabel-warp {
			margin-top: 10px;
		}

		.el-table__header,
		.el-table__row {
			background: #282C3D;
		}

		.block {
			background: #282C3D;
			text-indent: 15px;
			border-bottom: 2px solid #000;
		}

		.demonstration {
			color: #FFF !important;
		}

		/* .el-tabs__nav-scroll {
			padding: 0 0 0 10px;
		} */
	}
</style>
<template>
	<div class="gg_order_wrapper">
		<div :class="part?'order_container':'order_container all'">
			<!-- <div class="title">{{$t('ggOrder.main[62]')}}</div> -->
			<!-- <ul class="header_tongji">
				<li>{{$t('ggOrder.main[1]')}}:{{tongjiData.yingkui}}</li>
				<li>{{$t('ggOrder.main[2]')}}:{{tongjiData.keyong_price}}</li>
				<li>{{$t('ggOrder.main[4]')}}:{{tongjiData.totaldeposit}}</li>
				<li class="fenxian">{{$t('ggOrder.main[5]')}}：{{tongjiData.risk}}</li>
			</ul> -->

			<!-- <div class="headertongji">
					<div class="tongji1 tongji">
						<h2>
							{{$t('ggOrder.main[0]')}}:
							<span>{{tongjiData.totalusdt}}</span>
						</h2>
						<h2>
							{{$t('ggOrder.main[1]')}}:
							<span>{{tongjiData.yingkui}}</span>
						</h2>
					</div>
					<div class=" line"></div>
					<div class="tongji2 tongji">
						<h2>
							{{$t('ggOrder.main[2]')}}:
							<span>{{tongjiData.keyong_price}}</span>
						</h2>
						<h2>
							&nbsp; -->
			<!-- {{$t('ggOrder.main[3]')}}:
							<span>{{tongjiData.pingcang}}</span> -->
			<!-- </h2>
					</div>
					<div class=" line"></div>
					
					<div class="tongji3 tongji">
						<h2>
							{{$t('ggOrder.main[4]')}}:
							<span>{{tongjiData.totaldeposit}}</span>
						</h2>
						<h2>
							{{$t('ggOrder.main[5]')}}:
							<span>{{tongjiData.risk}}</span>
						</h2>
					</div>
				</div> -->
			<div class="block" v-if="timeselect">
				<span class="demonstration">{{$t('ggOrder.main[6]')}}：</span>
				<el-date-picker v-model="value" type="datetimerange" :range-separator="$t('ggOrder.main[7]')"
					:start-placeholder="$t('ggOrder.main[8]')" :end-placeholder="$t('ggOrder.main[9]')"
					@change="changetime">
				</el-date-picker>
			</div>
			<ul class="header-item">
				<li class="header-list">
					{{ $t('ggOrder.now[14]') }}
				</li>
				<li class="header-list tab-list" @click="handleClick(0)">
					{{ $t('ggOrder.now[0]') }}
					<span class="bottom" v-show="tabShow == 0"></span>
				</li>
				<li class="header-list tab-list" @click="handleClick(1)">
					{{ $t('ggOrder.trustNow[0]') }}
					<span class="bottom" v-show="tabShow == 1"></span>
				</li>
				<li class="header-list tab-list" @click="handleClick(2)">
					{{ $t('ggOrder.historyOrder[0]') }}
					<span class="bottom" v-show="tabShow == 2"></span>
				</li>
				<div class="right" v-show="isShow">
					<el-button :disabled="this.requestData3.length == 0" @click="all_ping" type="primary">{{$t('ggOrder.main[53]')}}</el-button>
				</div>
			</ul>
			<!-- 当前持仓 -->
			<div class="tabel-one tabel-warp" v-show="tabShow == 0">
				<el-table :data="requestData3" style="width: 100%;" height="600"
					:empty-text="$t('ggOrder.news[0]')"
					:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
					<el-table-column prop="hold_no" :label="$t('ggOrder.now[15]')" width="130">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.now[2]')" width="110">
						<template slot-scope="scope">
							{{ $public.InterceptingAdd(scope.row.pname) }}
						</template>
					</el-table-column>
					<el-table-column prop="addtime" :label="$t('ggOrder.now[3]')" width="70">
						<template slot-scope="scope">
							<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
							<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="hold_no" :label="$t('ggOrder.now[4]')" width="145">
						<template slot-scope="scope">
							<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="buynum" :label="$t('ggOrder.now[5]')">
					</el-table-column> -->
					<el-table-column :label="$t('ggOrder.now[6]')" width="80">
						<template slot-scope="scope">
							{{Number(scope.row.buyprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.now[7]')">
						<template slot-scope="scope">
							{{Number(scope.row.newprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="sxfee" :label="$t('ggOrder.now[8]')" width="90">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.now[9]')">
						<template slot-scope="scope">
							{{Number(scope.row.poit_win).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.now[10]')" width="80">
						<template slot-scope="scope">
							{{Number(scope.row.poit_loss).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="dayfee" :label="$t('ggOrder.now[11]')" width="90">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.now[12]')" width="90">
						<!-- <template slot-scope="scope">
							<div v-if="scope.row.fdyk == 0 ">— —</div>
							<div v-else>{{ scope.row.fdyk }}</div>
						</template> -->
						<template slot-scope="scope">
							{{Number(scope.row.totalprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.main[1]')" width="90">
						<!-- <template slot-scope="scope">
							<div v-if="scope.row.fdyk == 0 ">— —</div>
							<div v-else>{{ scope.row.fdyk }}</div>
						</template> -->
						<template slot-scope="scope">
							{{Number(scope.row.fdyk).toFixed(4)}}
						</template>
					</el-table-column>
					<!-- <el-table-column prop="totalprice" :label="$t('ggOrder.main[25]')" width="80">
					</el-table-column>
					<el-table-column prop="leverage" :label="$t('ggOrder.newplus[0]')" width="100">
					</el-table-column> -->
					<el-table-column prop="id" :label="$t('ggOrder.main[26]')" width="150">
						<template slot-scope="scope">
							<!--<el-button @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
										<span>平仓</span>
									</el-button>-->
							<!-- <span class="todos" @click="deleteRow(scope, requestData2)">平仓</span> -->
							<el-button type="warning" 
							class="todos warning" 
							@click="editStop(scope.row)"
							style="background: #2C64F3; border: none; color: #FFF; width: 55px; height: 33px;">
								{{$t('ggOrder.news[10]')}}</el-button>
							<el-button type="primary" 
							class="todos" 
							@click="deleteRow(scope, requestData2)"
							style="background: #FFA517; border: none; color: #FFF; width: 55px; height: 33px;">
								{{$t('ggOrder.main[27]')}}</el-button>
							<!-- <span class="todos" @click="editStop(scope.row)">编辑</span> -->

						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 当前委托 -->
			<div class="tabel-two tabel-warp" v-show="tabShow == 1">
				<el-table :data="requestData2" style="width: 100%" height="600"
					:empty-text="$t('ggOrder.news[0]')"
					:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
					<el-table-column prop="en_no" :label="$t('ggOrder.trustNow[1]')" width="130">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.trustNow[2]')" width="110">
						<template slot-scope="scope">
							{{ $public.InterceptingAdd(scope.row.pname) }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.trustNow[3]')" width="100">
						<template slot-scope="scope">
							<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
							<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.trustNow[4]')">
						<template slot-scope="scope">
							<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="buynum" :label="$t('ggOrder.trustNow[5]')" width="100">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.trustNow[6]')" width="120">
						<template slot-scope="scope">
							{{Number(scope.row.buyprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="sxfee" :label="$t('ggOrder.trustNow[7]')" width="120">
					</el-table-column>
					<el-table-column prop="totalprice" :label="$t('ggOrder.trustNow[8]')" width="130">
						<template slot-scope="scope">
							{{Number(scope.row.totalprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="poit_win" :label="$t('ggOrder.trustNow[9]')" width="120">
						<template slot-scope="scope">
							{{Number(scope.row.poit_win).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="poit_loss" :label="$t('ggOrder.trustNow[10]')" width="100">
						<template slot-scope="scope">
							{{Number(scope.row.poit_loss).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="id" :label="$t('ggOrder.trustNow[11]')">
						<template slot-scope="scope">
							<!--<el-button v-if="scope.row.state == 1" @click.native.prevent="deleteRow(scope, requestData2)" type="primary" plain size="small">
										<span style="font-size: 12px;">撤销</span>
									</el-button>
									<el-button v-else disabled @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
										<span>撤销</span>
									</el-button>-->
							<el-button 
							type="warning" 
							class="todos todoss"
							@click="deleteRow(scope, requestData2)"
							style="background: #2A64F3; border-color: #2A64F3;">
								{{$t('ggOrder.newplus[1]')}}</el-button>
							<!-- <span class="todos" @click="deleteRow(scope, requestData2)">撤销</span> -->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 历史成交 -->
			<div class="tabel-third tabel-warp" v-show="tabShow == 2">
				<el-table :data="requestData1" style="width: 100%" height="600" :empty-text="$t('ggOrder.news[0]')"
				:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
					<el-table-column prop="tran_no" :label="$t('ggOrder.historyOrder[1]')" width='110'>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[2]')" width="100">
						<template slot-scope="scope">
							{{ $public.InterceptingAdd(scope.row.pname) }}
						</template>
					</el-table-column>
					<el-table-column prop="otype" :label="$t('ggOrder.historyOrder[3]')" width="70">
						<template slot-scope="scope">
							<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
							<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[4]')" width="90">
							<!-- <template slot-scope="scope">
								<div v-if="scope.row.type == 1 " >{{$t('bbOrder.main[8]')}}</div>
								<div v-else-if="scope.row.type == 2" class="red">{{$t('bbOrder.main[7]')}}</div>
								<div v-else>{{$t('index.other[3]')}}</div>
							</template> -->
						<template slot-scope="scope">
							{{Number(scope.row.buyprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="sellprice" :label="$t('ggOrder.historyOrder[5]')" width="90">
						<template slot-scope="scope">
							{{Number(scope.row.sellprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column prop="buynum" :label="$t('ggOrder.historyOrder[6]')" width="70">
					</el-table-column>
					<el-table-column prop="sxfee" :label="$t('ggOrder.historyOrder[7]')" width="80">
						<!-- <template slot-scope="scope">
							<div>{{ $public.timestampToTime(scope.row.selltime) }}</div>
						</template> -->
					</el-table-column>
					<el-table-column prop="dayfee" :label="$t('ggOrder.historyOrder[8]')">
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[9]')" width="90">
						<template slot-scope="scope">
							{{Number(scope.row.totalprice).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[10]')" width="90">
						<template slot-scope="scope">
							{{Number(scope.row.poit_win).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[11]')">
						<template slot-scope="scope">
							{{Number(scope.row.poit_loss).toFixed(2)}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[12]')" width="100">
							<template slot-scope="scope">
								<span :class="scope.row.profit > 0 ? 'green' : 'red'">{{ scope.row.profit }}</span>
							</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[13]')" width="100">
						<template slot-scope="scope">
							<div v-if="scope.row.pc_type == 1 ">{{$t('ggOrder.main[43]')}}</div>
							<div v-else-if="scope.row.pc_type == 2">{{$t('ggOrder.main[44]')}}
							</div>
							<div v-else-if="scope.row.pc_type == 3">{{$t('ggOrder.main[45]')}}
							</div>
							<div v-else-if="scope.row.pc_type == 4">{{$t('ggOrder.main[46]')}}
							</div>
							<div v-else> --</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('ggOrder.historyOrder[14]')" width="140">
						<template slot-scope="scope">
							<div>{{ $public.timestampToTime(scope.row.selltime) }}</div>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="leverage" :label="$t('ggOrder.newplus[0]')" width="100">
					</el-table-column>
					<el-table-column prop="totalprice" :label="$t('ggOrder.main[25]')" width="60">
					</el-table-column> -->
				</el-table>
			</div>


			<!-- <el-card class="content">
				<el-tabs v-model="activeName" @tab-click="handleClick"> -->
					<!-- 持仓 -->
					<!-- <el-tab-pane :label="$t('ggOrder.now[14]')" name="third" disabled></el-tab-pane>
					<el-tab-pane :label="$t('ggOrder.now[0]')" name="first" class="historyWt"> -->
						<!-- <div class="bottom"></div> -->
						<!-- <div class="top-desc"></div>
						<el-table :data="requestData3" style="width: 100%;" height="600"
							:empty-text="$t('ggOrder.news[0]')"
							:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
							<el-table-column prop="pname" :label="$t('ggOrder.now[1]')" width="50">
							</el-table-column>
							<el-table-column prop="otype" :label="$t('ggOrder.now[2]')" width="110">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
									<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="addtime" :label="$t('ggOrder.now[3]')" width="50">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="hold_no" :label="$t('ggOrder.now[4]')" width="185">
							</el-table-column>
							<el-table-column prop="buynum" :label="$t('ggOrder.now[5]')">
							</el-table-column>
							<el-table-column prop="buyprice" :label="$t('ggOrder.now[6]')" width="100">
							</el-table-column>
							<el-table-column prop="newprice" :label="$t('ggOrder.now[7]')">
							</el-table-column>
							<el-table-column prop="sxfee" :label="$t('ggOrder.now[8]')" width="120">
							</el-table-column>
							<el-table-column prop="dayfee" :label="$t('ggOrder.now[9]')">
							</el-table-column>
							<el-table-column prop="poit_win" :label="$t('ggOrder.now[10]')" width="100">
							</el-table-column>
							<el-table-column prop="poit_loss" :label="$t('ggOrder.now[11]')" width="100">
							</el-table-column>
							<el-table-column prop="fdyk" :label="$t('ggOrder.now[12]')" width="120">
								<template slot-scope="scope">
									<div v-if="scope.row.fdyk == 0 ">— —</div>
									<div v-else>{{ scope.row.fdyk }}</div>
								</template>
							</el-table-column> -->
							<!-- <el-table-column prop="totalprice" :label="$t('ggOrder.main[25]')" width="80">
							</el-table-column>
							<el-table-column prop="leverage" :label="$t('ggOrder.newplus[0]')" width="100">
							</el-table-column> -->
							<!-- <el-table-column prop="id" :label="$t('ggOrder.main[26]')" width="120">
								<template slot-scope="scope"> -->
									<!--<el-button @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
												<span>平仓</span>
											</el-button>-->
									<!-- <span class="todos" @click="deleteRow(scope, requestData2)">平仓</span> -->
									<!-- <el-button type="warning" class="todos warning" @click="editStop(scope.row)">
										{{$t('ggOrder.news[10]')}}</el-button>
									<el-button type="primary" class="todos" @click="deleteRow(scope, requestData2)">
										{{$t('ggOrder.main[27]')}}</el-button> -->
									<!-- <span class="todos" @click="editStop(scope.row)">编辑</span> -->

								<!-- </template>
							</el-table-column>
						</el-table>
					</el-tab-pane> -->
					<!-- 委托 -->
					<!-- <el-tab-pane :label="$t('ggOrder.trustNow[0]')" name="second" class="historyWt"> -->
						<!-- <div class="bottom second-btm"></div> -->
						<!-- <div class="top-desc"></div>
						<el-table :data="requestData2" style="width: 100%" height="600"
							:empty-text="$t('ggOrder.news[0]')"
							:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
							<el-table-column prop="addtime" :label="$t('ggOrder.trustNow[1]')" width="50">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="otype" :label="$t('ggOrder.trustNow[2]')" width="110">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
									<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="en_no" :label="$t('ggOrder.trustNow[3]')" width="100">
							</el-table-column>
							<el-table-column prop="totalprice" :label="$t('ggOrder.trustNow[4]')">
							</el-table-column>
							<el-table-column prop="sxfee" :label="$t('ggOrder.trustNow[5]')" width="100">
							</el-table-column>
							<el-table-column prop="pname" :label="$t('ggOrder.trustNow[6]')" width="120">
							</el-table-column>
							<el-table-column prop="buyprice" :label="$t('ggOrder.trustNow[7]')" width="120">
							</el-table-column>
							<el-table-column prop="buynum" :label="$t('ggOrder.trustNow[8]')" width="130">
							</el-table-column>
							<el-table-column prop="leverage" :label="$t('ggOrder.trustNow[9]')" width="120">
							</el-table-column>
							<el-table-column prop="leverage" :label="$t('ggOrder.trustNow[10]')" width="100">
							</el-table-column>
							<el-table-column prop="id" :label="$t('ggOrder.trustNow[11]')">
								<template slot-scope="scope"> -->
									<!--<el-button v-if="scope.row.state == 1" @click.native.prevent="deleteRow(scope, requestData2)" type="primary" plain size="small">
												<span style="font-size: 12px;">撤销</span>
											</el-button>
											<el-button v-else disabled @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
												<span>撤销</span>
											</el-button>-->
									<!-- <el-button type="warning" class="todos todoss"
										@click="deleteRow(scope, requestData2)">
										{{$t('ggOrder.newplus[1]')}}</el-button> -->
									<!-- <span class="todos" @click="deleteRow(scope, requestData2)">撤销</span> -->
								<!-- </template>
							</el-table-column>
						</el-table>
					</el-tab-pane> -->
					<!-- <el-tab-pane :label="$t('ggOrder.main[39]')" name="third" class="nowDeal">
						<el-table :data="requestData1" style="width: 100%" height="600">
							<el-table-column prop="pname" :label="$t('ggOrder.main[40]')" width='100'>
							</el-table-column>
							<el-table-column prop="buynum" :label="$t('ggOrder.main[41]')">
							</el-table-column>
							<el-table-column prop="otype" :label="$t('ggOrder.main[12]')" width="70">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
									<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="en_no" :label="$t('ggOrder.main[42]')" width="120">
								<template slot-scope="scope">
									<div v-if="scope.row.pc_type == 1 " class="green">{{$t('ggOrder.main[43]')}}</div>
									<div v-else-if="scope.row.pc_type == 2" class="green">{{$t('ggOrder.main[44]')}}
									</div>
									<div v-else-if="scope.row.pc_type == 3" class="green">{{$t('ggOrder.main[45]')}}
									</div>
									<div v-else-if="scope.row.pc_type == 4" class="green">{{$t('ggOrder.main[46]')}}
									</div>
									<div v-else class="green"> --</div>
								</template>
							</el-table-column>
							<el-table-column prop="addtime" :label="$t('ggOrder.main[6]')" width="135">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="selltime" :label="$t('ggOrder.main[47]')" width="135">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.selltime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="sellprice" :label="$t('ggOrder.main[48]')">
							</el-table-column>
							<el-table-column prop="buyprice" :label="$t('ggOrder.main[49]')" width="90">
							</el-table-column>
							<el-table-column prop="sxfee" :label="$t('ggOrder.main[50]')" width="120">
							</el-table-column>
							<el-table-column prop="dayfee" :label="$t('ggOrder.main[51]')">
							</el-table-column>
							<el-table-column prop="profit" :label="$t('ggOrder.main[52]')">
							</el-table-column>
							<el-table-column prop="poit_win" :label="$t('ggOrder.main[22]')" width="100">
							</el-table-column> 
							<el-table-column prop="poit_loss" :label="$t('ggOrder.main[23]')" width="100">
							</el-table-column>
							<el-table-column prop="leverage" :label="$t('ggOrder.newplus[0]')" width="100">
							</el-table-column>
							<el-table-column prop="totalprice" :label="$t('ggOrder.main[25]')" width="60">
							</el-table-column>
						</el-table>
					</el-tab-pane> -->
					<!-- 歷史 -->
					<!-- <el-tab-pane :label="$t('ggOrder.historyOrder[0]')" name="fourth" class="histroyDeal historyWt"> -->
						<!-- <div class="bottom fourth-btm"></div> -->
						<!-- <div class="top-desc"></div>
						<el-table :data="requestData1" style="width: 100%" height="600" :empty-text="$t('ggOrder.news[0]')"
						:header-cell-style="{background:'#282C3D',color: '#AEAFB3'}">
							<el-table-column prop="pname" :label="$t('ggOrder.historyOrder[1]')" width='50'>
							</el-table-column>
							<el-table-column prop="buynum" :label="$t('ggOrder.historyOrder[2]')">
							</el-table-column>
							<el-table-column prop="otype" :label="$t('ggOrder.historyOrder[3]')" width="70">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="green">{{$t('ggOrder.main[13]')}}</div>
									<div v-else class="red">{{$t('ggOrder.main[14]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="type" :label="$t('ggOrder.historyOrder[4]')" width="110">
									<template slot-scope="scope"> -->
										<!-- 市价 -->
										<!-- <div v-if="scope.row.type == 1 " >{{$t('bbOrder.main[8]')}}</div>
										<div v-else-if="scope.row.type == 2" class="red">{{$t('bbOrder.main[7]')}}</div>
										<div v-else>{{$t('index.other[3]')}}</div>
									</template>
								</el-table-column>
							<el-table-column prop="en_no" :label="$t('ggOrder.historyOrder[5]')" width="100">
								<template slot-scope="scope">
									<div v-if="scope.row.pc_type == 1 " class="green">{{$t('ggOrder.main[43]')}}</div>
									<div v-else-if="scope.row.pc_type == 2" class="green">{{$t('ggOrder.main[44]')}}
									</div>
									<div v-else-if="scope.row.pc_type == 3" class="green">{{$t('ggOrder.main[45]')}}
									</div>
									<div v-else-if="scope.row.pc_type == 4" class="green">{{$t('ggOrder.main[46]')}}
									</div>
									<div v-else class="green"> --</div>
								</template>
							</el-table-column>
							<el-table-column prop="addtime" :label="$t('ggOrder.historyOrder[6]')" width="100">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="selltime" :label="$t('ggOrder.historyOrder[7]')" width="100">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.selltime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="sellprice" :label="$t('ggOrder.historyOrder[8]')">
							</el-table-column>
							<el-table-column prop="buyprice" :label="$t('ggOrder.historyOrder[9]')" width="90">
							</el-table-column>
							<el-table-column prop="sxfee" :label="$t('ggOrder.historyOrder[10]')" width="120">
							</el-table-column>
							<el-table-column prop="dayfee" :label="$t('ggOrder.historyOrder[11]')">
							</el-table-column>
							<el-table-column prop="profit" :label="$t('ggOrder.historyOrder[12]')">
							</el-table-column>
							<el-table-column prop="poit_win" :label="$t('ggOrder.historyOrder[13]')" width="100">
							</el-table-column>
							<el-table-column prop="poit_loss" :label="$t('ggOrder.historyOrder[14]')" width="140">
							</el-table-column> -->
							<!-- <el-table-column prop="leverage" :label="$t('ggOrder.newplus[0]')" width="100">
							</el-table-column>
							<el-table-column prop="totalprice" :label="$t('ggOrder.main[25]')" width="60">
							</el-table-column> -->
						<!-- </el-table>
					</el-tab-pane>
					<el-pagination class="el-paginations" :page-size="size" :current-page.sync="p" layout="prev, pager, next" background :total="total" @current-change="handleCurrentChange">
					</el-pagination>
				</el-tabs> -->
				<!--<div class="right">
							<div class="bitType">币种</div>
							<span>/</span>
							<el-select v-model="selectValue" placeholder="请选择">
								<el-option key="" label="全部" value=""></el-option>
								<el-option v-for="item in options" :key="item.mark" :label="item.pname" :value="item.mark"></el-option>
							</el-select>
							<el-button @click="searchBtn" type="primary">搜索</el-button>
						</div>-->
				<!-- <div  type="text" class="gethuilv" @click="woyaohuilv">
					<img  class="aidemolizhuanquanquan" v-if="loading" src="../../assets/img/loading.png" alt=""> -->
					<!-- 我要汇率 -->
					<!-- <span v-else>{{$t('ggOrder.other[0]')}}</span>	
				</div> -->

			<!-- </el-card> -->
		</div>
		<!--<FooTer></FooTer>-->
		<!-- 平仓确认 -->
		<el-dialog class="dialogwrappers" :title="$t('ggOrder.news[9]')" :visible.sync="dialogVisible" width="450px"
			center>
			<div class="dialogdiv">
				<span>{{$t('ggOrder.news[1]')}}</span>
				<span class="rise" v-if="scopeData.otype == '1'">{{$t('ggOrder.news[2]')}}</span>
				<span class="fall" v-else>{{$t('ggOrder.news[3]')}}</span>
				<span>{{$t('ggOrder.news[4]')}}</span>
				<span>{{scopeData.newprice}}</span>
			</div>
			<div class="relatives pc">
				<span>{{$t('ggOrder.news[5]')}}</span>
				<el-input class="inp" type="text" v-model="zhang" :placeholder="$t('ggOrder.news[5]')"></el-input>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">{{$t('ggOrder.news[6]')}}</el-button>
				<el-button type="primary" @click="confirmPingcang">{{$t('ggOrder.news[7]')}}</el-button>
			</span>
		</el-dialog>

		<!-- 设置 -->
		<el-dialog width="430px" class="dialogwrappers" :title="$t('ggOrder.news[10]')" :visible.sync="dialogFormVisible" 
		custom-class="dialog_set"
			center>
			<div class="dialogdiv">
				<!-- 方向 -->
				<span>{{$t('ggOrder.news[1]')}}</span>
				<span class="rise" v-if="scopeData.otype == '1'">{{$t('ggOrder.news[2]')}}</span>
				<span class="fall" v-else>{{$t('ggOrder.news[3]')}}</span>
				<span>{{$t('ggOrder.news[4]')}}</span>
				<!-- 最新价 -->
				<span>{{scopeData.newprice}}</span>
			</div>
			<div>
				<div class="relativesdd">
					<!-- <span class="spanss">{{(Number(scopeData.newprice) + Number(min_zy)).toFixed(4)}} < </span>  -->
					<div class="relatives">
						<span>{{$t('ggOrder.main[55]')}}：</span>
						<el-input class="inp" type="text" v-model="listData.zy" ></el-input>
					</div>
					<span class="spanss" v-if="scopeData.otype == '1'"> ≥ {{realTimeZY}}</span>
					<span class="spanss" v-else> ≤ {{realTimeZY}}</span>
					<!-- <span class="spanss"> < {{(Number(scopeData.newprice) + Number(max_zy)).toFixed(4)}}</span>  -->
				</div> 
				<div class="relativesdd">
					<!-- <span class="spanss">{{(Number(scopeData.newprice) + Number(min_zs)).toFixed(4)}} < </span>  -->
					<div class="relatives">
						<span>{{$t('ggOrder.main[56]')}}：</span>
						<el-input class="inp" type="text" v-model="listData.zs" ></el-input>
					</div>
					<span class="spanss" v-if="scopeData.otype == '1'"> ≤ {{realTimeZS}}</span>
					<span class="spanss" v-else> ≥ {{realTimeZS}}</span>
					<!-- <span class="spanss"> < {{(Number(scopeData.newprice) + Number(max_zs)).toFixed(4)}}</span>  -->
				</div> 
			</div> 
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{$t('ggOrder.news[6]')}}</el-button>
				<el-button type="primary" @click="OrderDown()" :loading="addLoading">{{$t('ggOrder.news[8]')}}</el-button>
			</span>
		</el-dialog>
		<!--弹框-->
		<el-dialog
		:title="$t('ggOrder.other[0]')"
		:visible.sync="gethuilv"
		width="30%"
		custom-class="dialog_gethuilv"	
		>
			<div v-html="fygz"></div>
		<span slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="gethuilv = false">{{$t('frenchDetails.main[24]')}}</el-button>
		</span>
	  </el-dialog>

	</div>
</template>
<script>
	export default {
		props: ["Code",'part','price','changeactive'],
		data() {
			return {
				tabShow: 0,
				myHeight: '70px',
				loading:false,
				gethuilv:false,
				zhang: "",
				sltData:'',
				fygz:"", // 返佣规则 -我要惠率渲染文本
				// 平仓
				dialogVisible: false,
				isShow: true,
				// 设置
				dialogFormVisible: false,
				addLoading: false,
				isActive: true,
				show: true,
				activeName: 'first',
				requestData1: [],
				requestData2: [],
				requestData3: [],
				requestDatatoday: [],
				listData: {
					zy: '', //止盈
					zs: '', //止损
					h_id: '' //订单ID
				}, //列表返回过来的数据
				options: [],
				selectLabel: '',
				selectValue: '',
				timer: null,
				code: '',
				stop: {
					stopwin: '', //止盈
					stoploss: '', //止损

				},
				//判断止盈止损所需条件
				scopeData: {
					otype: '', //方向 1 是做多 2是做空
					newprice: '', //最新价格
					orderprice: '', //下单价
					var_price: '', //最小变动价
					stoploss: '', //止损（最大）  //后台设置
					stopwin: '' //止盈（最大） //后台设置
				},
				//止盈最大最小
				stopwin: {
					min: '',
					max: ''
				},
				//止损最大最小
				stoploss: {
					min: '',
					max: ''
				},
				tongjiData: {
					keyong_price: '--',  //可用资金
					totalusdt: '--', //动态权益
					totaldeposit: '--', //冻结保证金
					yingkui: '--',  //浮动盈亏
					risk: '--',  //风险率
					pingcang: '--'  //平常盈亏
				},
				hold_id: '', //订单ID
				timeselect: false,
				value: [],
				values: [],
				orders_id: "",
				p: 1,
				size: 10,
				total:10,
				zhangs: "",
				reqUrl: null,
				min_zy: "",
				min_zs: "",
				// max_zy: "",
				// max_zs: "",
				setzyprice:"",
				setzsprice:"",
			}
		},
		watch: {
			'changeactive'(n,o) {
				this.activeName = 'first'
				alert(n)
				this.handleClick()
			},
			"zhang": function (val, oval) {
				var _this = this;
				_this.zhang = val.replace(/[^[1-9]\d]/g, '');
				if (Number(_this.zhang) > Number(_this.zhangs)) {
					_this.zhang = _this.zhangs;
				}
			},
			'$route': {
				handler: function (val, oldVal) {
					// console.log(val);
				},
				// 深度观察监听
				deep: true
			},
			"Code": function () {
				var _this = this;
			} 
		},
		computed:{

			// 实时止盈价格
			realTimeZY() {
				var _this = this
				var zyprice;
				// 买涨 止盈价格>= 最新价格+最小止盈价
				if (_this.scopeData.otype == 1){
					zyprice = Number(_this.scopeData.newprice) + Number(this.min_zy)
					return zyprice.toFixed(4)

				}else{
				// 买die 止盈价格<= 最新价格-最小止盈价
					if(Number(_this.scopeData.newprice) - Number(this.min_zy) < 0){
						zyprice = 0
						return zyprice
					}else{
						zyprice = Number(_this.scopeData.newprice) - Number(this.min_zy)
						return zyprice.toFixed(4)
					}
				}
			},
			// 实时止损价格
			realTimeZS() {
				var _this = this
				var zsprice;
				// 买涨 止损价格<= 最新价格-最小止损价
				if (_this.scopeData.otype == 1){
					zsprice = Number(_this.scopeData.newprice) - Number(this.min_zs)
					if(zsprice < 0){
						return 0 
					}else{
						return zsprice.toFixed(4)
					}

				}else{
				// 买die 止损价格>= 最新价格+最小止盈价
						zsprice = Number(_this.scopeData.newprice) + Number(this.min_zs)
						return zsprice.toFixed(4)
				}

			},
			demo() {
				// 买涨
				if (_this.scopeData.otype == 1){
					_this.setzyprice = (Number(_this.scopeData.newprice) + Number(_this.min_zy)).toFixed(4);
					if((Number(_this.scopeData.newprice) - Number(_this.min_zs)).toFixed(4) < 0){
						_this.setzsprice = 0;
					}else{
						_this.setzsprice = (Number(_this.scopeData.newprice) - Number(_this.min_zs)).toFixed(4);
					}
				}else{
					// 买跌
					if((Number(_this.scopeData.newprice) - Number(_this.min_zy)).toFixed(4) < 0){
						_this.setzyprice = 0;
					}else{
						_this.setzyprice = (Number(_this.scopeData.newprice) - Number(_this.min_zy)).toFixed(4);
					}
					_this.setzsprice = (Number(_this.scopeData.newprice) + Number(_this.min_zs)).toFixed(4);
				}
			}
		},
		methods: {
			woyaohuilv() {
				var _this = this
				if(!sessionStorage.account ){
					_this.$message({
							showClose: true,
							message: "请先登录",
							type: "error"
						});
						return false
				}
				this.loading = true
				this.$http.post(this.$http.agree, {type:'vip'} ).then(function (res) {
					_this.loading = false
					if(res.data.status == 200){
						
						// _this.fygz = _this.$t('currlanguage')=="cn"? res.data.data.fygz : res.data.data.data
						_this.fygz = res.data.data
						_this.gethuilv=true
					}else{
						_this.$message({
							showClose: true,
							message: res.data.msg,
							type: "error"
						});
					}
				}).catch(r=>{
					console.log(r);
					_this.loading = false
				})
			},
			setPrice(){//设置止盈止损价格
				var _this = this;
				// 买涨
				if (_this.scopeData.otype == 1){
					_this.setzyprice = (Number(_this.scopeData.newprice) + Number(_this.min_zy)).toFixed(4);
					if((Number(_this.scopeData.newprice) - Number(_this.min_zs)).toFixed(4) < 0){
						_this.setzsprice = 0;
					}else{
						_this.setzsprice = (Number(_this.scopeData.newprice) - Number(_this.min_zs)).toFixed(4);
					}
				}else{
					// 买跌
					if((Number(_this.scopeData.newprice) - Number(_this.min_zy)).toFixed(4) < 0){
						_this.setzyprice = 0;
					}else{
						_this.setzyprice = (Number(_this.scopeData.newprice) - Number(_this.min_zy)).toFixed(4);
					}
					_this.setzsprice = (Number(_this.scopeData.newprice) + Number(_this.min_zs)).toFixed(4);
				}
			},
			confirmPingcang() {//确认平仓
				var _this = this;
				var reqUrl;
				var mobile = sessionStorage.getItem('mobile');
				// var orders_id, num;
				if (_this.zhang == "") {
					_this.$message({
						message: "请输入平仓张数",
						type: 'warning'
					});
					return false;
				}
				_this.$http.post(_this.reqUrl, {
					'mobile': mobile,
					'order_id': _this.orders_id,
					'num': _this.zhang
				})
					.then((res) => {
						if (res.data.status == 200) {
							// rows.splice(scope.$index, 1);
							_this.$message({
								message: res.data.msg,
								type: 'success'
							});
							if (_this.activeName == 'first') {
								_this.requestPublic('requestData1', 'chichang',1);
								// _this.requestPublic('requestData3', 'chicang');
							}
							_this.dialogVisible = false;
						} else {
							_this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						}
					});
			},
			changetime(value) {
				const _this = this;
				value[0] = _this.$public.timestampToTime2(value[0]) + '00:00:00';
				value[1] = _this.$public.timestampToTime2(value[1]) + '23:59:59';
				// _this.getBitType(); // 获取币种
				_this.code = null; // 清空搜索条件
				_this.requestPublic('requestData1', 'chengjiao',1);
			}, 
			handleClick(num, tab, event) { // 切换事件
				var _this = this;
				_this.tabShow = num	
				if (_this.tabShow == 0) {
					_this.activeName = 'first'
					_this.isShow = true
				}	else if (_this.tabShow == 1) {
					_this.activeName = 'second'
						_this.isShow = false
				} else if (_this.tabShow == 2) {
					_this.activeName = 'third'
						_this.isShow = false
				}
				// _this.getBitType(); // 获取币种
				_this.code = null; // 清空搜索条件
				_this.p = 1;
				switch (_this.activeName) {
					case 'first':
						clearInterval(_this.timer);
						_this.timeselect = false;
						_this.requestPublic('requestData3', 'chicang',1);
						if (_this.timer) {
							clearInterval(_this.timer);
						}
						_this.timer = window.setInterval(function () {
							_this.requestPublic('requestData3', 'chicang',1);
							_this.tongji();
						}, 3000);
						break;
					case 'second':
						clearInterval(_this.timer);
						_this.timeselect = false;
							_this.requestPublic('requestData2', 'weituo',1);

						_this.timer = window.setInterval(function () {
							_this.requestPublic('requestData2', 'weituo',1);
							_this.tongji();
						}, 3000);
						break;
					case 'third':
						clearInterval(_this.timer);
						_this.timeselect = true;
						_this.requestPublic('requestDatatoday', 'chengjiao',1);
						_this.timer = window.setInterval(function () {
						_this.requestPublic('requestDatatoday', 'chengjiao',1);
						_this.tongji();
						}, 3000);
						break;
					case 'fourth':
						clearInterval(_this.timer);
						_this.timeselect = true;
						_this.requestPublic('requestData1', 'chengjiao',1);
						_this.timer = window.setInterval(function () {
						_this.requestPublic('requestData1', 'chengjiao',1);
						_this.tongji();
						}, 3000);

						break;
					default:
						break;
				}
			},
			//一键平仓执行函数
			all_ping() {
				var _this = this;
				//判断有没有订单
				if (this.requestData3.length == 0) {
					_this.$public.msg(_this.$t('ggOrder.script[0]'), 'warning', _this);
					// return false;
				}
				this.$confirm(_this.$t('ggOrder.script[1]'), _this.$t('ggOrder.script[2]'), {
					confirmButtonText: _this.$t('ggOrder.script[3]'),
					cancelButtonText: _this.$t('ggOrder.script[4]'),
					type: 'warning'
				}).then(() => {
					//请求接口
					_this.$http.post(_this.$http.all_ping, {}).then(function (response) {
						if (response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function (error) { });

				}).catch(() => {
					this.$message({
						type: 'info',
						message: _this.$t('ggOrder.script[5]')
					});
				});
			},
			tongji() {
				var _this = this;
				// _this.$http.post(_this.$http.tongji, {
				// 	mobile: sessionStorage.mobile
				// }).then(function (response) {
				// 	if (response.data.status == "200") {
				// 		_this.tongjiData = response.data.data;
				// 	}
				// }).catch(function (error) { });
			},
			//止盈止损确定函数
			OrderDown() {
				var _this = this;
				//设置止盈的最小值要大于计算止盈的最小值
				//设置 listData.zy
				//设置止损的最小值要大于计算止损的最小值

				//  if(_this.listData.zs != 0 && _this.listData.zs < _this.stoploss.min) {
				// 	_this.$public.msg(_this.$t('ggOrder.script[6]') + _this.stoploss.min, 'warning', _this);
				// 	return false
				// } else if(_this.listData.zy != 0 && _this.listData.zy < _this.stopwin.min) {
				// 	_this.$public.msg(_this.$t('ggOrder.script[7]') + _this.stopwin.min, 'warning', _this);
				// 	return false
				// }
				// _this.listData.zy=Number(_this.listData.zy);
				// _this.listData.zs=Number(_this.listData.zs);

				_this.listData.zy = _this.listData.zy;
				_this.listData.zs = _this.listData.zs;
				// if(!_this.listData.zy){
				// 	_this.$public.msg(_this.$t('tips.main[0]'),'warning',_this);
				// 	return false;
				// };
				if (_this.listData.zy < 0) {
					_this.$public.msg(_this.$t('tips.main[0]'), 'warning', _this);
					return false;
				}
				if (_this.listData.zy && _this.listData.zy.toString().split('.').length > 1) {
					if (_this.listData.zy.toString().split('.')[1]) {
						if (_this.listData.zy.toString().split('.')[1].length > 4) {
							_this.$public.msg(_this.$t('tips.main[1]'), 'warning', _this);
							return false;
						}
					}
				};
				// if(!_this.listData.zs){
				// 	_this.$public.msg(_this.$t('tips.main[0]'),'warning',_this);
				// 	return false;
				// };
				if (_this.listData.zs < 0) {
					_this.$public.msg(_this.$t('tips.main[2]'), 'warning', _this);
					return false;
				}
				if (_this.listData.zs && _this.listData.zs.toString().split('.').length > 1) {
					if (_this.listData.zs.toString().split('.')[1]) {
						if (_this.listData.zs.toString().split('.')[1].length > 4) {
							_this.$public.msg(_this.$t('tips.main[1]'), 'warning', _this);
							return false;
						}
					}
				};
				_this.addLoading = true;
				_this.$http.post(_this.$http.set_poit, _this.listData).then(function (response) {
					_this.addLoading = false;
					if (response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.requestPublic('requestData3', 'chicang',1);
						_this.dialogFormVisible = false;
						_this.listData.zy = 0;
						_this.listData.zs = 0;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function (error) {
					_this.addLoading = false;
				});
			},
			deleteRow(scope, rows) { // 操作事件函数
				var _this = this;
				var orders_id, num;
				var mobile = sessionStorage.getItem('mobile');
				_this.scopeData.otype = scope.row.otype;
				_this.scopeData.newprice = scope.row.newprice;
				_this.zhang = scope.row.buynum;
				_this.zhangs = scope.row.buynum;
				if (_this.activeName == 'second') {
					_this.reqUrl = _this.$http.cancellations;
					_this.orders_id = scope.row.en_id;
					this.$confirm(_this.$t('purchase.tips[1]'), _this.$t('ggOrder.script[2]'), {
						confirmButtonText: _this.$t('ggOrder.script[3]'),
						cancelButtonText: _this.$t('ggOrder.script[4]'),
						type: 'warning'
					}).then(function () {
						_this.$http.post(_this.reqUrl, {
							'mobile': mobile,
							'order_id': _this.orders_id,
							'num': _this.zhang
						})
							.then((res) => {
								if (res.data.status == 200) {
									// rows.splice(scope.$index, 1);
									_this.$message({
										message: res.data.msg,
										type: 'success'
									});
								} else {
									_this.$message({
										message: res.data.msg,
										type: 'warning'
									});
								}
							});
					}).catch(function () { })
				}
				if (_this.activeName == 'first') {
					_this.orders_id = scope.row.hold_id;
					_this.reqUrl = _this.$http.pingcang;
					_this.dialogVisible = true;
				}
				// window.setTimeout(function(){
				// 	_this.scopeData.newprice = scope.row.newprice;
				// },2000);
				// _this.$confirm(_this.$t('ggOrder.script[8]'), _this.$t('ggOrder.script[2]'), {
				// 	confirmButtonText: _this.$t('ggOrder.script[3]'),
				// 	cancelButtonText: _this.$t('ggOrder.script[4]'),
				// 	type: 'warning'
				// }).then(() => {

				// }).catch(() => {
				// 	_this.$message({
				// 		type: 'info',
				// 		message: _this.$t('ggOrder.script[5]')
				// 	});
				// });
			},
			searchBtn() { // 搜索按钮事件
				var _this = this;
				_this.code = _this.selectValue;
				//				if(_this.selectValue == '') {
				//					_this.$public.msg('搜索值为空，请选择搜索条件', 'warning', _this);
				//				} else {
				if (_this.activeName == 'first') {
					_this.requestPublic('requestData1', 'chichang');
				} else if (_this.activeName == 'second') {
					_this.requestPublic('requestData2', 'weituo');
				} else if (_this.activeName == 'third') {
					_this.requestPublic('requestData3', 'chengjiao');
				}
				//				}
			},
			//编辑止盈止损按钮执行函数
			editStop(datas) {
				var _this = this;
				this.listData.h_id = datas.hold_id, //订单Id
				this.listData.zy = datas.poit_win, //止盈
				this.listData.zs = datas.poit_loss //止损
				this.scopeData.otype = datas.otype;
				this.scopeData.newprice = datas.newprice;
				this.scopeData.orderprice = datas.buyprice;
				this.hold_id = datas.hold_id; //改变code
				this.judgment(datas.code);
				_this.getset_poit_pre(datas);
			},
			//获得判断条件
			judgment(code) {
				var _this = this;
				_this.$http.get(_this.$http.get_lever, {
					params: {
						code: code
					}
				}).then((res) => {
					_this.scopeData.var_price = res.data.data.var_price;
					_this.scopeData.stoploss = res.data.data.stoploss;
					_this.scopeData.stopwin = res.data.data.stopwin;
					// _this.scope(); //计算范围
					_this.setPrice();
					this.dialogFormVisible = true;
				});
			},
			scope() {
				//计算止盈止损范围
				//				scopeData:{
				//					otype:'',  //方向 1 是做多 2是做空
				//					newprice:'',  //最新价格
				//					orderprice:'', //下单价
				//					var_price:'',//最小变动价
				//					stoploss:'',  //止损（最大）
				//					stopwin:''  //止盈（最大）
				//				}	
				if (this.scopeData.otype == 1) {
					//做多
					var doBad = Number(this.scopeData.newprice - this.scopeData.orderprice);
					var fanwei = Math.ceil(Math.abs(Number(doBad)) / Number(this.scopeData.var_price));

					if (doBad > 0) {
						this.stopwin.min = fanwei;
						this.stopwin.max = Number(this.scopeData.stopwin);

						this.stoploss.min = 0;
						this.stoploss.max = Number(this.scopeData.stoploss);
					} else if (doBad < 0) {
						this.stopwin.min = 0;
						this.stopwin.max = Number(this.scopeData.stopwin);
						this.stoploss.min = fanwei;
						this.stoploss.max = Number(this.scopeData.stoploss);
					}
				} else if (this.scopeData.otype == 2) {
					//做空
					var doBad = this.scopeData.orderprice - this.scopeData.newprice;
					var fanwei = Math.ceil(Math.abs(Number(doBad)) / Number(this.scopeData.var_price));
					if (doBad > 0) {
						this.stopwin.min = fanwei;
						this.stopwin.max = Number(this.scopeData.stopwin);
						this.stoploss.min = 0
						this.stoploss.max = Number(this.scopeData.stoploss);
					} else if (doBad < 0) {
						this.stopwin.min = 0
						this.stopwin.max = Number(this.scopeData.stopwin);
						this.stoploss.min = fanwei;
						this.stoploss.max = Number(this.scopeData.stoploss);
					}
				}
			},
			getBitType: function () { // 获取币种信息
				var _this = this;
				_this.$http.post(_this.$http.getPro, {})
					.then((res) => {
						_this.selectLabel = res.data.data[0].pname;
						_this.selectValue = '';
						_this.options = res.data.data;
					});
			},
			requestPublic: function (status, url,i) { // 默认请求、初始化请求
				var _this = this;
				var mobile = sessionStorage.getItem('mobile');
				var btimes;
				if (_this.activeName == "third") {
					btimes = _this.value[0];
				} else {
					btimes = _this.value[0];
				}
				_this.$http.post(_this.$http[eval('url')], {
					p:i,
					size: _this.size,
					mobile: mobile,
					code: _this.code,
					btime: btimes,
					etime: _this.value[1]
				})
					.then((res) => {
						_this.requestData1 = [];
						_this.requestData2 = [];
						_this.requestData3 = [];
						_this.requestDatatoday = [];
						if (!res) {
							return false;
						}
						if (res.data.status == 200) {
							_this[eval('status')] = res.data.data;
							if (url == 'chicang') {
								_this.requestData3 = res.data.data.res;
								if(this.listData.h_id){
									var arr = _this.requestData3.filter(item=>item.hold_id == _this.hold_id)[0]
									_this.scopeData.newprice = arr.newprice;
								}


							}
							if (url == 'chengjiao') {
								_this.requestData1 = res.data.data.res;
								_this.requestDatatoday = res.data.data.res;
							}
							if (url == "weituo") {
								_this.requestData2 = res.data.data.res;
							}
							if (url == 'chicang' && _this.hold_id != 0) {
								for (var i = 0; i < res.data.data.length; i++) {
									if (res.data.data[i].hold_id == _this.hold_id) {
										_this.scopeData.newprice = res.data.data[i].newprice;
										_this.scopeData.orderprice = res.data.data[i].buyprice;
										//刷新弹框 从新计算最大最小值
										// _this.scope();
										_this.setPrice();
									}
								}
							}
							_this.total = Number(res.data.data.count);
						}
					});
			},
			offTime() {
				var _this = this;
				window.clearInterval(_this.timer);
			},
			//设置止盈止损参数
			getset_poit_pre(row) {
				var _this = this;
				_this.$http.post(_this.$http.set_poit_pre, { pid: row.pid }).then(function (response) {
					if (response.data.status == "200") {
						_this.min_zy = response.data.data.min_zy;
						_this.min_zs = response.data.data.min_zs;
						console.log(response.data);
						
						// _this.max_zy = response.data.data.max_zy;
						// _this.max_zs = response.data.data.max_zs;
					}
				}).catch(function (error) { })
			},
			//分页
            handleCurrentChange(i){
				var _this = this;
				switch (_this.activeName) {
					case 'first':
						clearInterval(_this.timer);
						_this.timeselect = false;
						_this.requestPublic('requestData3', 'chicang',i);
						if (_this.timer) {
							clearInterval(_this.timer);
						}
						_this.timer = window.setInterval(function () {
							_this.requestPublic('requestData3', 'chicang',i);
							_this.tongji();
						}, 3000);
						break;
					case 'second':
						clearInterval(_this.timer);
						_this.timeselect = false;
						if (_this.timer) {
							clearInterval(_this.timer);
						}
						_this.timer = window.setInterval(function () {
						_this.requestPublic('requestData2', 'weituo',i);

							_this.tongji();
						}, 3000);
						break;
					case 'third':
						clearInterval(_this.timer);
						_this.timeselect = false;
						_this.timer = window.setInterval(function () {
						_this.requestPublic('requestDatatoday', 'chengjiao',i);
							_this.tongji();
						}, 3000);
						break;
					case 'fourth':
						clearInterval(_this.timer);
						_this.timeselect = true;
						_this.timer = window.setInterval(function () {
							_this.requestPublic('requestData1', 'chengjiao',i);
							_this.tongji();
						}, 3000);
						break;
					default:
						break;
				}
            }
		},
		beforeRouteLeave(to, from, next) { // 路由改变时
			var _this = this;
			window.clearInterval(_this.timer);
			next()
		},
		// beforeCreate() {
		// 		if (this.$route.path == "/exchange") {
		// 			this.myHeight = '40px'
		// 		} else {
		// 			this.myHeight = '70px'
		// 		}
		// },
		created: function () {
			var _this = this;
			_this.value[0] = _this.$public.timestampToTime2(new Date().setDate(new Date().getDate() - 30)) + '00:00:00';
			_this.value[1] = _this.$public.timestampToTime2(new Date()) + '23:59:59';
			_this.values[0] = _this.$public.timestampToTime2(new Date()) + '00:00:00';
			// _this.getBitType();
			_this.requestPublic('requestData3', 'chicang',1);
			if (_this.timer) {
				clearInterval(_this.timer);
			}
			_this.tongji();
			if (sessionStorage.getItem('account')) {
				_this.timer = window.setInterval(function () {
					_this.requestPublic('requestData3', 'chicang',1);
					_this.tongji();
				}, 3000);
			}
		},
		mounted () {
			
		},
		components: {}
	}
</script>y