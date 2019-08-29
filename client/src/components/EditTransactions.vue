<template>
<div>
 <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click.stop="showEditTransactionDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          New Transaction
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
               <v-menu
                ref="datePicker"
                v-model="transactionDatePicker"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }" >
                  <v-text-field
                    value="transaction.transactionDate"
                    v-model="transaction.transactionDate"
                    label="Select Transaction Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    style="cursor: pointer;"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="transaction.transactionDate"
                v-on:input="$refs.datePicker.save(transaction.transactionDate)"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                prepend-icon="credit_card"
                v-bind:items="transactionTypes"
                v-model="transaction.transactionType"
                label="Transaction Type"
                single-line
                bottom
              ></v-select>
            </v-col>
            <v-col cols="12">
             <v-text-field
                prepend-icon="description"
                placeholder="Description"
                v-model="transaction.description"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
               <v-text-field
                prepend-icon="remove_circle"
                placeholder="Charge (-)"
                v-model="transaction.charge"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
                prepend-icon="add_circle"
                placeholder="Deposit (+)"
                v-model="transaction.deposit"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="message"
                placeholder="Notes"
                v-model="transaction.notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
         <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="saveTransaction"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
  name: 'EditTransaction',
  data: () => ({
    dialog: false,
    transaction: {
      id: null,
      transactionDate: null,
      transactionType: null,
      notes: '',
      charge: 0.0,
      deposit: 0.0,
    },
    transactionTypes: [
      { text: 'odliv', value: 'odliv' },
      { text: 'priliv', value: 'prili' },
    ],
    transactionDatePicker: false,
  }),
  methods: {
    saveTransaction() {
      console.log('Saving transaction record!');
      this.$store.dispatch('saveTransaction', this.transaction);
      this.dialog = false;
    },
    showEditTransactionDialog() {
      this.transaction.transactionDate = this.getCurrentDate();
      this.dialog = true;
    },
    getCurrentDate() {
      const dt = new Date(Date.now());
      let month = `${dt.getMonth() + 1}`;
      let day = `${dt.getDate()}`;
      const year = dt.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join('-');
    },
  },

};
</script>

<style scoped>

</style>
