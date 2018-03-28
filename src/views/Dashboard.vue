<template>
  <div class="hello" v-loading.fullscreen.lock="state.isInProgress || !user">
    <el-alert title="Une erreur est survenue" type="error" v-if="state.isError" closable></el-alert>
    <Hello v-if="user" :user-name="user" />
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Ma carte" name="Card" :params="{ cardId: cardId, params: state.paramInfos}" :disabled="!cardId"></el-tab-pane>
        <el-tab-pane label="Toutes les transactions" name="Transactions" :params="{ transactions: transactions }" :disabled="!transactions && !transactions.length"></el-tab-pane>
        <el-tab-pane label="Transactions par périodes" name="Range" :params="{ transactions: transactions }" :disabled="!transactions && !transactions.length"></el-tab-pane>
      </el-tabs>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

import Hello from '@/components/Hello.vue';
import SodexoCard from '@/components/SodexoCard.vue';

@Component({
    components: {
        Hello
    }
})
export default class Dashboard extends Vue {
    @State(state => state) state;
    @Action('fetchCard') fetchCard;
    @Action('fetchConsumerInfo') fetchConsumerInfo;
    @Action('fetchTransactions') fetchTransactions;

    data() {
      return {
        user: null,
        cardId: null,
        transactions: [],
        activeName: ''
      }
    }

    handleClick(tab, event) {
      this.$router.push({name: tab.name, params: tab.$attrs.params});
    }

    async mounted() {
      await this.fetchConsumerInfo();
      await this.fetchCard();
      await this.fetchTransactions();

      this.user = this.state.userInfos.first_name;
      this.cardId = this.state.card.id;
      this.transactions = this.state.transactions.reverse();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  router-link {
    border-right: 1px solid black;
  }
  router-link:last-of-type {
    border-right: 0;
  }
</style>
