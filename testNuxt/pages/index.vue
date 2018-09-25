<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>

      <v-card>
        <v-card-title class="headline">Welcome to world of movies</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/inspire">Get started</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      Mtitle: '',
      Mdescription: '',
      Mlink: ''
    }
  },
  methods: {
    ...mapActions(['getFirst'])
  },
  created () {
    this.Mtitle = this.getFirst()
  }
}
</script>
