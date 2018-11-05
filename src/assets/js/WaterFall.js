function waterFail(boxDom){
  let boxWidth = boxDom.offsetWidth
  let space = 10
  let cards = boxDom.children
  let cardWidth = cards[0].offsetWidth
  // 计算容器中一行能排多少个
  var col = parseInt(boxWidth/(cardWidth + space))

  // 反求版心 让版心居中
  // 版心的宽度就等于列数 * 一列的宽度 + 列数-1 的space的距离
  boxDom.style.width = col * cardWidth + (col - 1) * space + "px"

  let heightArr = []

  Array.prototype.slice.call(cards).forEach((el,i)=>{
    if(i < col){
      el.style.top = 0
      el.style.left = i * (cardWidth + space) + 'px'
      // 将高度存入数组
      heightArr.push(el.offsetHeight)
    }else{
      // 除了第一排以外的所有的Li元素
			// 找数组里面的最小值
			var min = 0;
			var minHeight = heightArr[0];
			// 遍历数组，从0开始分别和数组里面的每一项做匹配
			// 如果有比最小的还小，就将最小值重新赋值一下
			for(var index = 0; index < heightArr.length; index++){
				if(minHeight > heightArr[index]){
					minHeight = heightArr[index];
					min = index;
				}
      }
      
      el.style.left = min * (cardWidth + space) + "px"
      el.style.top = minHeight + space + "px"

      // 更新列高
			// 将新加进来的li的高度和space加上这一列的高度里面去
			heightArr[min] = heightArr[min] + el.offsetHeight + space;
    }
  })


}

export default waterFail