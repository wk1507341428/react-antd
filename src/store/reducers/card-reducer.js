// 其实这个state应该不是整个state树，而是单一reducer层级的数据
// 这是一个reducer，接受state树，和一个对象
// 这个reducer会被传入createStore中，从而修改state
export default function (state = 1, action) {
  switch (action.type) {
    case "ADD_ZINDEX":{
      return state + 1;
    }
    default:
      return state;
  }
}