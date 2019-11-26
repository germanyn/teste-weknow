<template>
  <v-list>
    <v-list-item v-if="!produtos.length" two-line>
      <v-list-item-content>
        <v-list-item-title>
          Nenhum produto para listar
          <v-icon color="primary">mdi-emoticon-sad-outline</v-icon>
        </v-list-item-title>
        <v-list-item-subtitle>
          <a href="" @click.prevent="$emit('adicionar')" class="text-primary"
            >Clique aqui para adicionar <i class="mdi mdi-plus"/> </a
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <template v-else>
      <v-list-item
        v-for="produto in produtos"
        :key="produto.id"
        @click="() => editarProduto(produto._id)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ produto.descricao }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click.stop="() => deletarProduto(produto._id)">
          <v-icon> mdi-delete </v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    produtos: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      excluindo: false,
    }
  },
  methods: {
    editarProduto(id) {
      this.$router.push({
        name: 'editar-produto',
        params: { id },
      })
    },
    async deletarProduto(id) {
      if (this.excluindo) return

      const { descricao } = this.produtos.find(produto => produto._id === id)
      if (!window.confirm(`Deseja mesmo excluir o produto "${descricao}"`)) return

      this.excluindo = true
      try {
        await this.$axios.delete(`/produtos/${id}`)
        const index = this.produtos.findIndex(produto => produto._id === id)
        if (index === -1) return
        this.produtos.splice(index, 1)
      } catch (error) {
        alert(error.message)
      } finally {
        this.excluindo = false
      }
    },
  },
}
</script>

<style>

</style>