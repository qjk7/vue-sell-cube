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
            <div class="title">{{buyerinfo.buyeraddress}}</div>
            <div class="buyername">{{buyerinfo.buyername}} {{buyerinfo.buyerphone}}</div>
          </div>
          <div class="info">
            <div class="info-item">
              <div class="item-left" style="font-weight: bold">支付方式</div>
              <div class="item-right" style="color:lightskyblue;font-weight: bold">支付宝</div>
            </div>
          </div>
          <split></split>
          <div class="rating">
            <div class="rating-wrapper">
              <div class="seller-name">{{sellerName}}</div>
              <ul>
                <li
                  v-for="(food,index) in selectFoods"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="avatar">
                    <img width="40" height="40" :src="food.icon">
                  </div>
                  <div class="content">
                    <h1 class="name">{{food.name}}</h1>
                    <p class="text">x{{food.count}}</p>
                    <p class="orderAmount">￥{{food.price}}</p>
                  </div>
                </li>
              </ul>
              <div class="totalCount">
                总金额<span class="count">￥{{totalPrice}}</span>
              </div>
            </div>
          </div>
          <split style="margin-top: 50px;"></split>
        </div>
      </cube-scroll>
      <div class="paycontent">
        <div class="content-left">
          <div class="price highlight">
            ￥{{totalPrice}}
          </div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay enough">
            去支付
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import popupMixin from 'common/mixins/popup'
  import Split from 'components/split/split'
  import { getBuyerinfo } from 'api'
  import moment from 'moment'
  const EVENT_SHOW = 'show'

  export default {
    name: 'pay-order',
    mixins: [popupMixin],
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      sellerName: {
        type: String,
        default: ''
      },
      totalPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        buyerinfo: {}
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
      },
      pay() {

      }
    },
    created() {
      console.log(this.selectFoods)
      getBuyerinfo().then((buyerinfo) => {
        this.buyerinfo = buyerinfo
      })
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
      margin-bottom: 10px
      .title
        margin-left: 18px
        font-size: $fontsize-large-xxx
        margin-top: 65px
        font-weight: bold
      .buyername
        margin-left: 18px
        font-size: $fontsize-large
        margin-top:15px
    .ratings-content
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
          font-size: $fontsize-large-x
          font-weight: bold
        .totalCount
          flex: 1
          margin-right: 5px
          margin-top: 20px
          float: right
          font-size: $fontsize-large
          margin-bottom: 125px
          .count
            margin-left: 5px
            font-size: $fontsize-large-x
            font-weight: bold
        .rating-item
          display: flex
          padding: 17px 0
          &:last-child
            border-none()
          .avatar
            flex: 0 0 40px
            width: 40px
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
              font-size: $fontsize-large
              width: 200px
            .text
              font-size: $fontsize-large
              width: 25px
            .orderAmount
              width: 60px
              font-size: $fontsize-large
              margin-right: 5px
              text-align: right
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
          font-size: $fontsize-large-x
          display: flex
          .item-left
            width: 100px
          .item-right
            width: 330px
            text-align: right
    .paycontent
      position: fixed
      left: 0
      bottom: 0
      display: flex
      z-index: 50
      width: 100%
      height: 48px
      background: $color-background
      font-size: 0
      color: $color-light-grey
     .content-left
       flex: 1
       margin-left: 15px
       .price
         display: inline-block
         vertical-align: top
         margin-top: 12px
         line-height: 24px
         padding-right: 12px
         box-sizing: border-box
         border-right: 1px solid rgba(255, 255, 255, 0.1)
         font-weight: 700
         font-size: $fontsize-large

         &.highlight
           color: $color-white

       .desc
         display: inline-block
         vertical-align: top
         margin: 12px 0 0 12px
         line-height: 24px
         font-size: $fontsize-small-s
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-weight: 700
        font-size: $fontsize-small
        &.enough
          background: $color-green
          color: $color-white
</style>
