<template>
  <v-form ref="form">
    <fieldset :disabled="salvando">
      <v-card>
        <v-card-title primary-title>
          {{ titulo }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col xs="12">
                <v-text-field
                  autofocus
                  label="Descrição"
                  v-model="produto.descricao"
                  :rules="[obrigatorio]"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" text @click="voltar"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="salvar" :carregando="carregando">
            Salvar Produto
          </v-btn>
        </v-card-actions>
      </v-card>
    </fieldset>
  </v-form>
</template>

<script>
import { obrigatorio } from '@/shareds/rules'

export default {
  props: {
    produtoInicial: {
      type: Object,
      default: () => ({
        descricao: '',
      })
    },
    carregando: {
      type: Boolean,
      default: false,
    },
    titulo: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      salvando: false,
      produto: { ...this.produtoInicial },
    }
  },
  methods: {
    obrigatorio,
    voltar() {
      this.$router.go(-1)
    },
    salvar() {
      if (!this.$refs.form.validate()) return
      this.$emit('salvar', this.produto)
    },
  }
}
</script>

<style scoped>
fieldset {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
</style>