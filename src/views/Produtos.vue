<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        Produtos
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="criarProduto"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <AppLoading v-if="carregando" class="text-center pa-10"/>
      <div v-else-if="mensagemDeErro">{{ mensagemDeErro }}</div>
      <template v-else>
        <ListaDeProdutos :produtos="produtos" @adicionar="criarProduto"/>
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="primary"
          @click="criarProduto"
          v-if="$vuetify.breakpoint.xs"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import ListaDeProdutos from '@/components/ListaDeProdutos.vue'
import AppLoading from '@/components/ui/AppLoading'

export default {
  components: {
    ListaDeProdutos,
    AppLoading,
  },
  name: 'Produtos',
  data() {
    return {
      carregando: true,
      mensagemDeErro: '',
      produtos: [],
    }
  },
  async created() {
    try {
      const response = await this.$axios.get('/produtos')
      this.produtos = response.data
    } catch (error) {
      this.mensagemDeErro = error.message
    } finally {
      this.carregando = false
    }
  },
  methods: {
    criarProduto() {
      this.$router.push({ name: 'novo-produto' })
    },
  }
}
</script>
