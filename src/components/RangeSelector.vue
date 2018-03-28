<template>
    <div class="range-selector">
        <div class="daterange">
            <el-date-picker 
            v-model="range" 
            type="daterange" 
            range-separator=" à " 
            start-placeholder="Date de début" 
            end-placeholder="Date de fin"
            value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <p v-if="isComputedAmount" >Pourcentage : <el-input-number v-model="percentage" :min="50" :max="100" @change="changePercentage()"></el-input-number> %</p>
            <div class="buttons">
                <el-checkbox id="checkbox" v-model="isComputedAmount">Calculer un pourcentage</el-checkbox>
                <el-button @click="addToRanges()" :disabled="!areDatesSelected()">Ajouter la période</el-button>
                <el-button @click="calculate()" :disabled="!arrayRanges.length">Soumettre</el-button>
            </div>
        </div>
        <div class="selected-ranges" v-if="arrayRanges.length">
            <span>Périodes séléctionnées : </span>
            <template v-for="(range, index) in arrayRanges">
                <el-tag :key="index">De {{range.startDate}} à {{range.endDate}} <i class="el-icon-delete" @click="removeFromRanges(index)"></i></el-tag>
            </template>
        </div>
        <Amounts v-if="isCalculate && filteredTransactions.length" :amount="filteredAmount" :percentage="parseInt(percentage)/100" :is-computed-amount="isComputedAmount" />
        <TransactionsList v-if="isCalculate && filteredTransactions.length" :transactions="filteredTransactions" />
    </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

import TransactionsList from '@/components/TransactionsList.vue';
import Amounts from '@/components/Amounts.vue';

@Component({
    components: {
        TransactionsList,
        Amounts
    }
})
export default class DateRange extends Vue {
    @Prop()
    transactions

    data() {
        return {
            range: [],
            isCalculate: false,
            isComputedAmount: false,
            arrayRanges: [],
            filteredTransactions : [],
            filteredAmount : 0,
            percentage: 50
        };
    }

    areDatesSelected() {
        return this.range[0] && this.range[1];
    }

    addToRanges() {
        this.resetDatas();
        if(this.areDatesSelected())
        {
            this.arrayRanges.push({
                startDate: this.range[0],
                endDate: this.range[1]
            })
            this.range = [];
        }
    }

    calculate() {
        this.filteredTransactions = this.getItemsInIntervals(this.transactions, this.arrayRanges);
        this.filteredTransactions = this.filteredTransactions.reduce((acc, val) => acc.concat(val), [])
        this.filteredAmount = this.computeAmounts(this.filteredTransactions);
        this.isCalculate = true;
    }

    resetDatas() {
        this.isCalculate = false;
        this.filteredTransactions = [];
        this.filteredAmount = 0;
    }

    removeFromRanges(index) {
        if (index > -1) {
            this.arrayRanges.splice(index, 1);
            this.resetDatas();
        }
    }

    getItemsInIntervals(items, intervals) {
        if(intervals.length)
            return intervals.map(interval => this.getItemsInIntervals(items, interval));
        else {
            return items.filter(item =>
                item.debitOrCredit === "0" && this.$moment(item.date).isBetween(intervals.startDate, intervals.endDate, 'days', [])
            );
        }
    }

    computeAmounts(items) {
        const amount = items.reduce((prevValue, elem) => {
            return prevValue+elem.amount;
        }, 0);
        return amount;
    }

    changePercentage() {
        this.isCalculate = false;
        this.$nextTick(() => {
            this.isCalculate = true;
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .range-selector {
        padding: 10px;
    }
    .daterange el-date-picker, .daterange p {
        display: block;
    }
    .buttons {
        padding: 2px;
        display: inline-block;
    }
    .buttons #checkbox {
        display: block;
    }
    .selected-ranges {
        margin: 5px;
    }
    .selected-ranges span:not(.el-tag) {
        display: block;
    }
    .el-tag {
        margin: 0 5px;
    }
</style>