<template>
  <div class="mb-2 mx-1">
    <div
      class="modal fade"
      id="editCategoryModal"
      ref="editCategoryModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body">
              <input
                v-model="category.label"
                id="categoryLabel"
                type="text"
                class="form-control"
                placeholder="Category"
                required
              />
            </div>
            <div class="modal-footer">
              <button
                ref="closeModal"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >Close</button>
              <button type="submit" class="btn btn-primary" v-on:click="updateCategory">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="header mb-2 px-3">
      <button class="btn btn-primary">
        <fai icon="pen" size="lg" />
      </button>
      <h3 style="text-align:center">{{category.label}}</h3>
      <button class="btn btn-danger">
        <fai icon="trash-alt" size="lg" />
      </button>
    </div>
    <draggable
      style="max-height: 45vh; overflow: auto"
      :id="category.ID"
      :list="labels"
      class="list-group"
      draggable=".item"
      group="a"
      @change="declareChange"
    >
      <div class="list-group-item item" v-for="e in labels" :key="e.ID">{{e.label}}</div>
    </draggable>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  name: "Draggable",
  props: ["category", "labels"],
  methods: {
    declareChange(e) {
      this.$emit("change", e);
    },
    formatCategoryLabel: label => {
      let sentence = label.toLowerCase().split(" ");
      label = sentence.map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
      return label.trim();
    },
    updateCategory() {
      this.category.label = this.formatCategoryLabel(this.category);
      axios
        .put(`${this.api}/categories/${this.category.ID}`, this.category)
        .then(res => {
          console.log(res.data);
          this.$refs["closeModal"].click();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>