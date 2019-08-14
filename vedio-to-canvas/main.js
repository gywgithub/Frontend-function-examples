let processor = {
  timerCallback: function () {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(function () {
      self.timerCallback();
    }, 0);
  },

  doLoad: function () {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    let self = this;
    this.video.addEventListener("play", function () {
      self.width = self.video.videoWidth
      self.height = self.video.videoHeight
      self.timerCallback();
    }, false);
  },

  computeFrame: function () {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
    return;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});


// Add Keypoint 
let addButton = document.getElementById('add')
addButton.onclick = addKeyPoint

function addKeyPoint() {
  console.log('add key point')
  let x = 107
  let y = 83
  let pointSize = 3
  let ctx = document.getElementById('c1').getContext('2d')
  ctx.fillStyle = '#ff2626'
  ctx.beginPath()
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true)
  ctx.arc(117, 93, pointSize, 0, Math.PI * 2, true)
  ctx.arc(127, 103, pointSize, 0, Math.PI * 2, true)
  ctx.fill()
}

// clear point
let clearButton = document.getElementById('clear')
clearButton.onclick = clearPoint

function clearPoint() {
  console.log('clear')
  let ca2 = document.getElementById('c1')
  let ctx2 = ca2.getContext('2d')
  ctx2.clearRect(0, 0, ca2.width, ca2.height)
}

function drawCoordinates(x, y) {
  console.log(x, y)
  let ctx = c2.getContext('2d')
  ctx.fillStyle = '#ff2626'
  ctx.beginPath()

  let pointSize = 3
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true)
  ctx.fill()
  setTimeout(() => {
    ctx.clearRect(0, 0, c2.width, c2.height)
    console.log('3s clear point')
  }, 3000)
}


let c2 = document.getElementById('c2')
c2.addEventListener('click', event => {
  getPosition(event)
})


function getPosition(e) {
  let rect = c2.getBoundingClientRect()
  let x = e.clientX - rect.left
  let y = e.clientY - rect.top
  drawCoordinates(x, y)
}



let c3 = document.getElementById('c3')
let ctx3 = c3.getContext('2d')
ctx3.fillStyle = '#00ff00'
ctx3.strokeStyle= '#8aff8a'
// let points = [[230.03951727175246,206.6535707720588,68.58525848388672],[230.9780464920343,237.2607054227941,71.7688980102539],[236.43031939338232,266.33425398284317,76.45328521728516],[240.15839460784312,293.2620075061275,83.3031997680664],[248.43711224724262,320.78892999387256,95.87472534179688],[264.1230947457108,344.32806908700985,118.97840881347656],[284.04715265012254,359.6637768075981,151.2139129638672],[311.2108992034314,373.24084865196085,179.5615692138672],[348.02818627450984,381.8509895833334,185.33473205566406],[380.0689721200981,375.7609734987746,174.0946502685547],[401.8068704044118,364.47683210784317,141.59750366210938],[416.22797947303934,351.6631257659314,109.5372085571289],[429.0642233455883,330.6329672181373,83.35580444335938],[435.08559283088243,302.39826669730394,69.37943267822266],[439.90381816789227,275.8981422334559,62.07630920410156],[443.0269799325981,248.0519986979167,56.389461517333984],[446.58601409313746,218.55340609681372,51.70639419555664],[259.72393918504906,167.37995615042888,158.45938110351562],[272.358092064951,155.75025285309434,173.097412109375],[289.51180491727945,151.4912603400735,183.95492553710938],[304.9658107383579,153.33426116344972,190.8905487060547],[317.84613396139713,156.91421243106615,194.2404022216797],[377.7345856311276,160.65247931985292,190.39251708984375],[390.39273131127464,157.87539407169115,186.24864196777344],[405.12919347426487,157.54286975337007,176.683349609375],[420.7363855698531,163.02746495863968,163.0297393798828],[430.98330269607857,176.15096181832106,145.34129333496094],[348.93543198529414,195.87195695465687,199.48890686035156],[350.07655484068636,214.92045955882352,215.36105346679688],[352.1794960171569,231.04216605392156,230.1549072265625],[352.9558632046569,246.17130208333333,235.45486450195312],[328.7055759803922,265.0054779411765,205.2082061767578],[337.83000153186276,266.388079810049,211.5644073486328],[349.558038449755,269.17436580882355,214.30288696289062],[357.4991574754903,266.9534137561275,210.62620544433594],[366.1687921262256,265.6261025582108,202.7850341796875],[278.75466260723044,197.09405790441173,172.01284790039062],[289.3050225949755,188.84632218903184,181.6864776611328],[303.1835458792892,190.98439568014703,182.9109649658203],[315.85548789828437,199.03837469362742,177.9221954345703],[304.46655752144613,202.91912875306372,181.45703125],[289.77576401654414,201.67716145833333,180.19168090820312],[375.17740885416674,200.67001914828433,174.33306884765625],[389.19512101715696,193.4208425245098,176.40138244628906],[402.8761680453432,193.1754572610294,172.7048797607422],[412.15594362745105,201.95954120710783,162.5676727294922],[402.4334214154413,205.0348131127451,171.85546875],[387.5311159620099,205.03493757659314,175.39906311035156],[304.8115425857843,306.68639093137256,192.2257537841797],[321.7372376685049,296.403092064951,208.8866729736328],[340.8994523590687,290.03804917279416,216.84129333496094],[351.18458946078437,292.2044669117647,216.8337860107422],[357.9971086090687,290.6676064644608,215.7578582763672],[375.43489583333337,297.3779886642157,203.8652801513672],[388.1187576593138,309.33381357230394,185.48585510253906],[374.30434283088243,316.1618428308824,203.63958740234375],[363.5890203737746,318.7854450061275,210.82220458984375],[351.72392003676475,318.471145067402,214.0260772705078],[335.7341835171569,318.5442340686275,213.58631896972656],[323.31218405330884,314.6214016544118,207.79501342773438],[308.85753676470586,305.5061672794118,192.64976501464844],[336.3193550857843,300.78308976715687,208.9682159423828],[351.09830729166674,299.79727864583333,211.63812255859375],[361.7123161764706,301.3358432904412,207.50027465820312],[385.8833486519609,309.439224877451,186.7356414794922],[361.4904258578432,305.5686864276961,207.83180236816406],[350.8868719362746,305.33511565563725,210.133056640625],[336.73429840686276,305.5245879289216,209.2118377685547]]

let points = [[543.2919331 , 289.32859784,  97.75481415],
[535.65441123, 334.03297846,  98.64089966],
[534.00686532, 379.46278716, 102.05437469],
[527.28395844, 420.08375872, 108.84712219],
[523.96463631, 465.62078103, 122.05255127],
[533.9539607 , 509.2141455 , 154.0234375 ],
[552.532561  , 544.35285226, 198.38294983],
[582.92397311, 581.01128738, 239.02813721],
[633.64264658, 610.00059252, 254.15153503],
[687.64938998, 611.32186124, 243.09150696],
[731.14866118, 596.7561241 , 199.18328857],
[765.78829465, 577.50854013, 157.94644165],
[796.13803717, 549.14955019, 124.16621399],
[816.13324992, 510.49220557, 109.37152863],
[839.82309014, 478.59553211, 107.3916626 ],
[862.86383882, 438.04981977, 105.60617828],
[884.10309879, 393.71480955, 111.84385681],
[586.41848647, 261.47568383, 263.70654297],
[607.29520554, 254.38398369, 296.89880371],
[635.47497388, 258.90553915, 317.60647583],
[657.93171333, 269.73905768, 331.36734009],
[676.40261907, 281.21524224, 337.56820679],
[767.87846943, 309.84071754, 337.99850464],
[789.30833992, 311.25252048, 334.97406006],
[815.24264401, 315.61478496, 323.44845581],
[841.49122075, 328.73239773, 301.01812744],
[856.11578782, 346.45280822, 269.51147461],
[710.21774854, 346.75790432, 339.34130859],
[701.28694931, 378.5211812 , 357.8269043 ],
[695.58121541, 406.68892577, 373.50872803],
[690.19387111, 431.56594555, 376.96572876],
[650.79397655, 436.03832858, 316.87454224],
[663.75235605, 443.94277828, 327.23519897],
[680.2632516 , 453.83859618, 330.68502808],
[694.00184913, 454.24617334, 328.17132568],
[711.08280634, 454.43482157, 316.35150146],
[605.76287626, 308.24857719, 278.93548584],
[624.13562951, 303.68637175, 297.10766602],
[644.35985191, 311.66534962, 301.29116821],
[662.16113913, 329.26648425, 295.06399536],
[642.0354155 , 329.84985863, 296.50201416],
[619.50922672, 321.05743863, 291.2744751 ],
[753.8580923 , 360.01412719, 296.87277222],
[778.53826844, 354.94728866, 304.40838623],
[800.00419102, 359.62809664, 301.706604  ],
[812.63119525, 374.23161729, 282.70611572],
[795.02907948, 376.62961997, 294.28356934],
[770.9978025 , 371.36205172, 298.62289429],
[593.66330219, 465.82308828, 264.99273682],
[623.16599372, 466.67679563, 300.83612061],
[657.20622753, 472.38218324, 320.97164917],
[673.41433554, 480.6491546 , 322.16467285],
[685.57389383, 481.98935355, 322.51730347],
[716.69658239, 496.14959124, 302.48291016],
[739.00905576, 512.22232116, 266.15206909],
[702.58401657, 530.78199122, 289.35092163],
[679.70850342, 534.86280314, 299.03305054],
[657.26034414, 530.49949981, 301.13168335],
[628.72357546, 520.32596154, 299.75912476],
[612.80534626, 502.37194351, 287.20907593],
[599.1951819 , 467.42500156, 265.83670044],
[644.99418787, 482.54952686, 304.87185669],
[669.9369248 , 490.39410777, 312.43655396],
[689.53466037, 497.50510368, 306.82995605],
[734.90881342, 512.53297706, 267.56634521],
[682.68693707, 513.37002426, 299.80133057],
[663.3442787 , 509.4992148 , 303.91070557],
[637.90604676, 499.42086636, 298.24462891]]

console.log('len')
console.log(points.length)

for(let arr of points) {
  ctx3.beginPath()
  ctx3.arc(arr[0], arr[1], 2, 0, Math.PI * 2, true)
  ctx3.fill()  
}

// 0 - 16
let arr0_16 = points.slice(0, 17)
pointToLine(arr0_16)
// 17 - 21
let arr17_22 = points.slice(17, 22)
pointToLine(arr17_22)
// 22 - 26
let arr22_26 = points.slice(22, 27)
pointToLine(arr22_26)
// 27 - 30
let arr27_30 = points.slice(27, 31)
pointToLine(arr27_30)
// 31 - 35
let arr31_35 = points.slice(31, 36)
pointToLine(arr31_35)
// 36 - 41
let arr36_41 = points.slice(36, 42)
pointToLine(arr36_41, true)
// 42 - 47
let arr42_47 = points.slice(42, 48)
pointToLine(arr42_47, true)
// 48 - 59
let arr48_59 = points.slice(48, 60)
pointToLine(arr48_59, true)
// 61 - 68
let arr61_68 = points.slice(60, 68)
console.log(arr61_68.length)
pointToLine(arr61_68, true)



function pointToLine (arr, close = false) {
  ctx3.beginPath()
  ctx3.moveTo(arr[0], arr[1])
  arr.forEach((v, i)=> {
    ctx3.lineTo(v[0], v[1])
    if (i === arr.length - 1 && close) {
      ctx3.lineTo(arr[0][0], arr[0][1])
    }
  })
  ctx3.stroke()
}



