// Central performance direction, kept separate from the narrative and choices.
const CHARACTERS=PEOPLE.map((p,i)=>({...p,key:['zhihe','jianwei','yingxia','shuning'][i],color:['#aa7757','#648d9e','#c08371','#8d8b67'][i]}));
const EXPRESSIONS=['neutral','happy','sad','shy'];
const LOCATIONS={
 classroom:{name:'靠窗第二排',file:'classroom',music:'daylight'},
 hallway:{name:'走廊与公告栏',file:'hallway',music:'daylight'},
 cafeteria:{name:'十七分钟的午休',file:'cafeteria',music:'daylight'},
 library:{name:'图书馆',file:'library',music:'quiet'},
 rainstop:{name:'雨天的车站',file:'rainstop',music:'rain'},
 town:{name:'放学后的街道',file:'town',music:'summer'},
 workshop:{name:'知禾家的修鞋铺',file:'workshop',music:'quiet'},
 bookshop:{name:'城南旧书店',file:'bookshop',music:'closer'},
 pool:{name:'学校游泳馆',file:'pool',music:'quiet'},
 home:{name:'寒假的书桌',file:'home',music:'quiet'}
};
const TRACKS={daylight:'01 · 窗边的第一阵风',quiet:'02 · 写在页边的话',rain:'03 · 等下一班车',closer:'04 · 两个人的书签',summer:'05 · 明天见'};
STORY.forEach(s=>{
 if(!LOCATIONS[s.bg])throw Error('Unknown authored scene: '+s.bg);
 if(!EXPRESSIONS.includes(s.expression))throw Error('Unknown authored expression: '+s.expression);
 // Scene, pose and CG are authored in scenario.js; wording never silently changes scenery.
 s.music??=LOCATIONS[s.bg].music;
});
