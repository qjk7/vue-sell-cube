// 引入单个方法使用 { }
import { get, getRemove } from './helpers'

const getSeller = get('api/seller')
const getGoods = getRemove('product/list')
const getRatings = get('api/ratings')
const getList = getRemove('order/list?openid=dsjfjdasb8782')
const getBuyerinfo = get('api/buyerinfo')

export {
  getSeller,
  getGoods,
  getRatings,
  getList,
  getBuyerinfo
}
