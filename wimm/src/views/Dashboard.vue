<template>
  <div id="content" class="mt-4">
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h2 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <Total v-bind:transactions="transactions" />

      <div class="row">
        <Categorize title="Income/Category" chart_id="income" v-bind:transactions="transactions.filter(e=>e.amount > 0)" />
        <Categorize title="Expenses/Category" chart_id="expenses" v-bind:transactions="transactions.filter(e=>e.amount < 0)" />
      </div>
    </div>
  </div>
</template>

<script>
import Total from "../components/dashboard/Total";
import Categorize from "../components/dashboard/Categorize";
//import Datepicker from "vuejs-datepicker";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Total,
    Categorize
  },
  data() {
    return {
      startDay: Date,
      endDay: Date,
      transactions: []
    };
  },
  created() {
    this.startDay = new Date();
    this.startDay.setDate(1);
    this.endDay = new Date();
    this.updateData();
  },
  methods: {
    selectStartDay(e) {
      this.startDay = e;
      this.updateData();
    },
    selectEndDay(e) {
      this.endDay = e;
      this.updateData();
    },
    updateData() {
      var dd = this.endDay.getDate();
      var mm = this.endDay.getMonth() + 1;
      var yyyy = this.endDay.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var _endDay = yyyy + "-" + mm + "-" + dd;
      
      dd = this.startDay.getDate();
      mm = this.startDay.getMonth() + 1;
      yyyy = this.startDay.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var _startDay = yyyy + "-" + mm + "-" + dd;


      _startDay = "2020" + "-" + "06" + "-" + "01";
      // _endDay = "2020" + "-" + "04" + "-" + "31";
      axios
        .get(`${this.api}/transactions/${_startDay}/${_endDay}`)
        .then(res => {
          this.transactions = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>