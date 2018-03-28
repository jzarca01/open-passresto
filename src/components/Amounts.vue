<template>
    <div class="amounts">
        <div class="amount">
            <span>Depensés : </span><animate-number
                from="0"
                :to="amount"
                duration="1000"
                easing="easeOutQuad"
                :formatter="formatNumber"
                >
            </animate-number> €
        </div>
        <div class="amount" v-if="isComputedAmount">
            <span>{{percentage * 100}} % : </span><animate-number
                from="0"
                :to="amount * percentage"
                duration="1000"
                easing="easeOutQuad"
                :formatter="formatNumber"
                >
            </animate-number> €
        </div>
    </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Amounts extends Vue {
    @Prop()
    amount

    @Prop({default: false})
    isComputedAmount

    @Prop({default: 0.8})
    percentage

    formatNumber(num) {
        return num.toFixed(2)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .amount {
        display: inline-block;
        padding-top: 50px;
        height: 100px;
        width: 49%;
        font-size: 1.5rem;
    }
    .amount:nth-of-type(2) {
        border-left: 1px solid black;
    }
    .header-transactions span {
        font-weight: bold;
        font-size: 20px;
    }
</style>