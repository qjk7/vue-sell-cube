<template>
  <transition
    name="move"
  >
    <div class="order" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="ratings-content">
          <div class="back">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
          <div class="head-content">
            <div class="title">{{orderStstusCom(order.orderStatus)}}</div>
            <div class="cancel" v-show="order.orderStatus === 0">取消订单</div>
          </div>
          <split></split>
          <div class="rating">
            <div class="rating-wrapper">
              <div class="seller-name">{{seller.name}}</div>
              <ul>
                <li
                  v-for="(food,index) in order.orderDetailList"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="avatar">
                    <img width="40" height="40" :src="food.productIcon">
                  </div>
                  <div class="content">
                    <h1 class="name">{{food.productName}}</h1>
                    <p class="text">x{{food.productQuantity}}</p>
                    <p class="orderAmount">￥{{food.productPrice}}</p>
                  </div>
                </li>
              </ul>
              <div class="totalCount">
                总金额<span class="count">￥{{order.orderAmount}}</span>
              </div>
            </div>
          </div>
          <split style="margin-top: 50px;"></split>
          <div class="info">
            <p class="title">订单信息</p>
            <div class="info-item">
              <div class="item-left">下单时间</div>
              <div class="item-right">{{format(order.createTime)}}</div>
            </div>
            <div class="info-item">
              <div class="item-left">收货地址</div>
              <div class="item-right">{{order.buyerAddress}}</div>
            </div>
            <div class="info-item">
              <div class="item-left">收货人</div>
              <div class="item-right">{{order.buyerName}} {{order.buyerPhone}}</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import popupMixin from 'common/mixins/popup'
  import Split from 'components/split/split'
  import moment from 'moment'
  const EVENT_SHOW = 'show'

  export default {
    name: 'order-detail',
    mixins: [popupMixin],
    props: {
      order: {
        type: Object,
        default() {
          return {}
        }
      },
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      orderStstusCom() {
        return function (status) {
          if (status === 0) {
            return '配送中'
          } else if (status === 1) {
            return '已完结'
          }
          return '已取消'
        }
      }
    },
    methods: {
      format(time) {
        return moment.unix(time).format('YYYY-MM-DD HH:mm')
      }
    },
    created() {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    components: {
      Split
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"

  .order
    position: fixed
    left: 0
    top: 0
    bottom: 0
    z-index: 30
    width: 100%
    background: $color-white
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .head-content
      display: flex
      margin-bottom: 10px
      .title
        margin-left: 18px
        font-size: $fontsize-large-xxx
        margin-top: 65px
        font-weight: bold
      .cancel
        width: 70px
        height: 35px
        margin-top: 62px
        margin-left: 10px
        line-height: 35px
        text-align: center
        border-radius: 4px
        color: $color-blue
        border: 1px solid $color-blue
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: $fontsize-large-xx
        color: $color-blue
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid $color-col-line
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: $fontsize-large-xxx
          color: $color-orange
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: $fontsize-small
          color: $color-dark-grey
        .rank
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          display: flex
          align-items: center
          margin-bottom: 8px
          .title
            line-height: 18px
            font-size: $fontsize-small
            color: $color-dark-grey
          .star
            margin: 0 12px
          .score
            line-height: 18px
            font-size: $fontsize-small
            color: $color-orange
    .rating-wrapper
      padding: 0 18px
      .seller-name
        margin-top: 10px
        margin-bottom: 15px
        font-size: $fontsize-large
        font-weight: bold
      .totalCount
        flex: 1
        margin-right: 5px
        margin-top: 20px
        float: right
        font-size: $fontsize-medium
        .count
          margin-left: 5px
          font-size: $fontsize-large
          font-weight: bold
      .rating-item
        display: flex
        padding: 15px 0
        &:last-child
          border-none()
        .avatar
          flex: 0 0 40px
          width: 28px
          margin-right: 12px
          img
            height: auto
            border-radius: 2px
        .content
          position: relative
          display: flex
          height: 40px
          line-height: 40px
          flex: 1
          .name
            margin-top: 5px
            font-size: 15px
            width: 200px
          .text
            margin-top: 5px
            font-size: 15px
            width: 25px
          .orderAmount
            width: 60px
            margin-top: 5px
            font-size: 15px
            text-align: right
          .orderStatus
            position: absolute
            right: 0
            top: 7px
            line-height: 12px
            font-size: $fontsize-small
            color: $color-light-grey
      .no-rating
        padding: 16px 0
        font-size: $fontsize-small
        color: $color-light-grey
    .info
      margin: 10px 18px
      .title
        display: block
        font-size: $fontsize-large
        font-weight: bold
        margin-bottom: 15px
      .info-item
        height: 50px
        line-height: 50px
        font-size: $fontsize-medium
        display: flex
        .item-left
          width: 80px
        .item-right
          width: 330px
          text-align: right
</style>
