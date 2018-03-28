<template>
    <el-row v-if="params && cardId" type="flex" class="row-bg" justify="space-around">
        <el-col :span="20">
                <el-card>
                    <img src="https://www.macartepassrestaurant.fr/wp-content/uploads/2014/05/coup_denvoi-324x160.png" class="image">
                    <div style="padding: 14px;">
                        <p>Numéro de carte : {{cardId}}</p>
                        <p id="availableCard">{{params.card_available_today ? "Vous pouvez encore utiliser votre carte aujourd'hui" : "Vous ne pouvez pas/plus utiliser votre carte aujourd'hui"}}</p>
                    </div>
                </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SodexoCard extends Vue {
    @Prop()
    cardId

    @Prop()
    params
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
    display: block;
  }
</style>