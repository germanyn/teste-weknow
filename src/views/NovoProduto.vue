<template>
  <v-container>
    <FormularioDeProduto
      :carregando="enviando"
      @salvar="enviarProduto"
      titulo="Novo Produto"
    />
  </v-container>
</template>

<script>
import FormularioDeProduto from '@/components/FormularioDeProduto'

export default {
  components: {
    FormularioDeProduto,
  },
  data() {
    return {
      enviando: false
    }
  },
  methods: {
    async enviarProduto(produto) {
      this.enviando = true
      try {
        await this.$axios.post('/produtos', produto)
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