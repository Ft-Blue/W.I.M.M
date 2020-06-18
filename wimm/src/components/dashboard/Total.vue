<template>
  <div class="row">
    <!-- Earnings -->
    <div class="col-xl-4 col-md-8 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-sm font-weight-bold text-success text-uppercase mb-1">Earnings</div>
              <div class="h4 mb-0 font-weight-bold text-gray-800">{{totalIncome}}€</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-2x text-gray-300">
                <fai icon="euro-sign" size="2x"/>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expenses -->
    <div class="col-xl-4 col-md-8 mb-4">
      <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-sm font-weight-bold text-success text-uppercase mb-1">Expenses</div>
              <div class="h4 mb-0 font-weight-bold text-gray-800">{{totalExpenses}}€</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-2x text-gray-300">
                <fai icon="receipt" size="2x"/>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Balance -->
    <div class="col-xl-4 col-md-8 mb-4">
      <div class="card shadow h-100 py-2 border-left-info">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-sm font-weight-bold text-info text-uppercase mb-1">Balance</div>
              <div class="h4 mb-0 font-weight-bold text-gray-800 text-info">
                {{Math.round((totalExpenses+totalIncome+ Number.EPSILON) * 100) / 100}}€
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-2x text-gray-300">
                <fai icon="balance-scale" size="2x"/>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Total",
  props: ["transactions"],
  computed: {
    totalIncome() {
      var income = 0;
      this.transactions.forEach(elt => {
        if (elt.amount > 0) income += elt.amount;
      });
      return Math.round((income + Number.EPSILON) * 100) / 100;
    },
    totalExpenses() {
      var expenses = 0;
      this.transactions.forEach(elt => {
        if (elt.amount < 0) expenses += elt.amount;
      });
      return Math.round((expenses + Number.EPSILON) * 100) / 100;
    }
  }
};
</script>

<style scoped>
</style>