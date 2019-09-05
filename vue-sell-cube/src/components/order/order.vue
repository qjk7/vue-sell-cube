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
          <div class="title">历史订单</div>
          <div class="rating">
            <div class="rating-wrapper">
              <ul v-show="orderList && orderList.length">
                <li
                  v-for="(order,index) in orderList"
                  class="rating-item border-bottom-1px"
                  :key="index"
                  @click="showDetail(order)"
                >
                  <div class="avatar">
                    <img width="40" height="40" :src="seller.avatar">
                  </div>
                  <div class="content">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="orderStatus">
                      {{orderStstusCom(order.orderStatus)}}
                    </div>
                    <p class="text">{{orderDescript(index)}}</p>
                    <p class="orderAmount">￥{{order.orderAmount}}</p>
                  </div>
                </li>
              </ul>
              <div class="no-rating" v-show="!orderList || !orderList.length">暂无订单</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import popupMixin from 'common/mixins/popup'
  import moment from 'moment'
  import { getList } from 'api'
  const EVENT_SHOW = 'show'

  export default {
    name: 'order',
    mixins: [popupMixin],
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        orderList: [],
        selectedOrder: {}
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
      },
      orderDescript() {
        return function (index) {
          return this.orderList[index].orderDetailList[0].productName + ' 等' + this.orderList[index].orderDetailList.length + '件商品'
        }
      }
    },
    methods: {
      format(time) {
        return moment(time).format('YYYY-MM-DD hh:mm')
      },
      showDetail(order) {
        this.selectedOrder = order
        this.orderDetailComp = this.orderDetailComp || this.$createOrderDetail({
          $props: {
            order: 'selectedOrder',
            seller: 'seller'
          }
        })
        this.orderDetailComp.show()
      }
    },
    created() {
      getList().then((list) => {
        this.orderList = list
      })
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
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
      transform: translate3d(0, 100%, 0)
    .title
      margin-left: 18px
      font-size: $fontsize-large-xxx
      margin-top: 65px
      font-weight: bold
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
      .rating-item
        display: flex
        padding: 30px 0
        &:last-child
          border-none()
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            height: auto
            border-radius: 2px
        .content
          position: relative
          flex: 1
          margin-left: 8px
          .name
            margin-top: 5px
            margin-bottom: 4px
            font-size: $fontsize-large
            font-weight: bold
          .text
            margin-bottom: 8px
            margin-top: 10px
            line-height: 18px
            color: $color-dark-grey
            font-size: $fontsize-medium
          .recommend
            display: flex
            align-items: center
            flex-wrap: wrap
            line-height: 16px
            .icon-thumb_up, .item
              margin: 0 8px 4px 0
              font-size: $fontsize-small-s
            .icon-thumb_up
              color: $color-blue
            .item
              padding: 0 6px
              border: 1px solid $color-row-line
              border-radius: 1px
              color: $color-light-grey
              background: $color-white
          .orderStatus
            position: absolute
            right: 0
            top: 7px
            line-height: 12px
            font-size: $fontsize-medium
            color: $color-light-grey
          .orderAmount
            position: absolute
            right: 0
            top: 33px
            line-height: 12px
            font-size: $fontsize-medium
            font-weight: bold
      .no-rating
        padding: 16px 0
        font-size: $fontsize-small
        color: $color-light-grey
</style>
