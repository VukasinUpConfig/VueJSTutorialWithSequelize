<template>
  <v-container fluid>
      <v-row>
          <v-col xs="12" >
              <h1 style="text-align: center;">Login</h1>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col xs="12" sm="4" offset-sm="4">
              <v-text-field
                label="E-mail"
                v-model="email"
                v-bind:rules="emailRules"
                required>
              </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="4" offset-sm="4">
              <v-text-field
                label="Password"
                v-model="password"
                v-bind:rules="passwordRules"
                v-bind:type="'password'"
                required>
              </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="4" offset-sm="4">
              <v-row  align="center" justify="space-around">
               <v-btn v-on:click="cancel">Cancel</v-btn>
               <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-row>
          </v-col>
        </v-row>
      <v-snackbar
        :timeout="6000"
        :top="true"
        v-model="showAlert"
        >
        {{ loginError }}
      </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false,
      message: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid Email address',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    loginError() {
      return this.$store.getters.loginError;
    },
  },
  methods: {
    login() {
      const vm = this;
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('logInUser', payload)
        .then(() => {
          if (vm.isLoggedIn) {
            this.$router.push({ path: '/' });
          } else {
            vm.showAlert = true;
          }
        });
    },
    cancel() {
      console.log('The user doesnt want to log in');
    },
  },
};
</script>

<style>

</style>
