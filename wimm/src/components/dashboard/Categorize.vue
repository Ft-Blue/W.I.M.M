<template>
  <div class="col-xl-6 col-lg-6">
    <div class="card shadow mb-4">
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">{{this.title}}</h6>
      </div>
      <!-- Card Body -->
      <div class="card-body">
        <div class="chart-area">
          <canvas :id="chart_id"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
// Default exports

export default {
  name: "Categorize",
  props: ["transactions", "chart_id", "title"],
  data() {
    return {
      amount_per_cat: [],
      chart: Object
    };
  },
  mounted() {
    this.draw();
    this.update_drawing();
  },
  watch: {
    transactions(newValue) {
      let promises = [];
      this.transactions = newValue;
      this.transactions.forEach(e =>
        promises.push(axios.get(`${this.api}/labels/${e.label_id}`))
      );
      Promise.all(promises)
        .then(labels => {
          this.transactions.forEach((t, i) => {
            t.category_id = labels[i].data[0].category_id;
          });
          return this.transactions;
        })
        .then(() => this.categorize(this.update_drawing))
        .catch(err => console.log(err));
    }
  },
  methods: {
    draw() {
      var ctx = document.getElementById(this.chart_id).getContext("2d");
      this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "bar",
        // Configuration options go here
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0
                },
                display: true
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            mode: 'nearest',
            intersect: false
          }
        }
      });
    },
    update_drawing() {
      this.chart.data.labels = this.amount_per_cat.map(e => e.label);
      this.chart.data.datasets = [
        {
          backgroundColor:
            this.chart_id == "expenses"
              ? "rgb(217, 83, 79)"
              : "rgb(92, 184, 92)",
          borderColor: "rgb(255, 99, 132, 1)",
          data: this.amount_per_cat.map(e => e.amount)
        }
      ];
      this.chart.update();
    },
    categorize(callback) {
      this.amount_per_cat = [];
      axios
        .get(`${this.api}/categories`)
        .then(res => {
          res.data.forEach(category => {
            let filtered_transactions = this.transactions.filter(
              e => e.category_id == category.ID
            );

            let total = filtered_transactions
              .map(e => e.amount)
              .reduce((a, b) => a + b, 0);

            this.amount_per_cat.push({
              label: category.label,
              amount: Math.abs(Math.round((total + Number.EPSILON) * 100) / 100)
            });
          });
          this.amount_per_cat = this.amount_per_cat.filter(
            (e, i) => (this.amount_per_cat.indexOf(e) === i) & (e.amount != 0)
          );
          this.amount_per_cat.sort((b, a) => a.amount - b.amount);
          callback();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>