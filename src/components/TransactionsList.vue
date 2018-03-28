<template>
    <div class="transactions-list">
        <div class="header-transactions">
            <p>{{transactions.length}} transactions au total</p>
        </div>
        <el-collapse v-model="activeNames">
            <template v-for="(transaction, index) in transactions">
                <el-collapse-item :title="transaction.description" :name="index" :key="index">
                    <div>{{transaction.date}}</div>
                    <div>{{transaction.debitOrCredit === "0" ? "Débit" : "Crédit"}} : {{transaction.amount}} €</div>
                </el-collapse-item>
            </template>
        </el-collapse>
    </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TransactionsList extends Vue {
    @Prop()
    transactions

    activeNames = ['1']
}
</script>

<style scoped>
    .transactions-list {
        padding: 10px;
    }
    .header-transactions {
        margin: 30px 0;
    }
    .header-transactions p {
        font-weight: bold;
        font-size: 20px;
    }
</style>