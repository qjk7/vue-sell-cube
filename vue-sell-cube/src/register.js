import { createAPI } from 'cube-ui'
import HeaderDetail from 'components/header-detail/header-detail'
import Vue from 'vue'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import shopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'
import Order from 'components/order/order'
import OrderDetail from 'components/order-detail/order-detail'
import PayOrder from 'components/pay-order/pay-order'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, shopCartSticky)
createAPI(Vue, Food)
createAPI(Vue, Order)
createAPI(Vue, OrderDetail)
createAPI(Vue, PayOrder)
