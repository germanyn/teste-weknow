<template>
  <v-container>
    <AppLoading v-if="carregando" class="text-center pa-10"/>
    <div v-else-if="mensagemDeErro" class="text-center pa-10">
      {{ mensagemDeErro }}
    </div>
    <FormularioDeProduto
      v-else
      :carregando="enviando"
      @salvar="enviarProduto"
      :produto-inicial="produtoInicial"
      titulo="Editar Produto"
    />
  </v-container>
</template>

<script>
import FormularioDeProduto from '@/components/FormularioDeProduto'
import AppLoading from '@/components/ui/AppLoading'

export default {
  props: {
    id: {
      type: String,
    }
  },
  components: {
    FormularioDeProduto,
    AppLoading,
  },
  data() {
    return {
      carregando: true,
      enviando: false,
      mensagemDeErro: '',
      produtoInicial: null,
    }
  },
  created() {
    this.buscarProduto()
  },
  methods: {
    async buscarProduto() {
      try {
        const resposta = await this.$axios.get(`/produtos/${this.id}`)
        this.produtoInicial = resposta.data
      } catch (error) {
        this.mensagemDeErro = error.message
      } finally {
        this.carregando = false
      }
    },
    async enviarProduto(produto) {
      this.enviando = true
      try {
        await this.$axios.put(`/produtos/${this.id}`, produto)
        this.$router.push({ name: 'produtos' })
      } catch (error) {
        alert(error.message)
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>

<style>

</style>