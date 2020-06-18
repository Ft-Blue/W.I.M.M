<template>
  <div id="content" class="mt-4">
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h2 mb-0 text-gray-800">Categories</h1>
        <button
          class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          data-toggle="modal"
          data-target="#newCategoryModal"
        >
          <i class="text-white-50">
            <fai icon="plus" size="sm" />
          </i> New Category
        </button>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="newCategoryModal"
        ref="newCategoryModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add new category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div class="modal-body">
                <input
                  v-model="new_category_label"
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
                <button type="submit" class="btn btn-primary" v-on:click="addCategory">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div v-if="categories.length > 0" class="row" :key="changes">
        <div v-for="c in categories" :key="c.ID" class="col-lg-3">
          <Draggable :category="c" :labels="labels_per_cat[c.ID]" @change="changeCategory" />
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import axios from "axios";
import Draggable from "../components/categories/Draggable";

export default {
  name: "Categories",
  components: { Draggable },
  props: [],
  data() {
    return {
      categories: [],
      labels: Array,
      labels_per_cat: {},
      changes: 0,
      new_category_label: ""
    };
  },
  created() {
    Promise.all([this.fetch_categories(), this.fetch_labels()]).then(values => {
      [this.categories, this.labels] = values;
      this.categories.forEach(c => {
        this.labels_per_cat[c.ID] = this.labels.filter(
          l => l.category_id == c.ID
        );
      });
      this.categories.sort((a, b)=>this.labels_per_cat[b.ID].length - this.labels_per_cat[a.ID].length)
    });
  },
  methods: {
    fetch_categories() {
      return axios
        .get(`${this.api}/categories`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    fetch_labels() {
      return axios
        .get(`${this.api}/labels`)
        .then(res => {
          //this.labels = res.data;
          return res.data;
        })
        .catch(err => console.log(err));
    },
    reRender() {
      this.changes++;
    },
    changeCategory(e) {
      if (e.added) {
        let updated_elt = e.added.element;
        let new_category;
        this.categories.forEach(cat_id => {
          cat_id = cat_id.ID;

          let s_id = this.labels_per_cat[cat_id]
            .map(e => e.ID)
            .indexOf(updated_elt.ID);
          if (s_id != -1) new_category = cat_id;
        });
        updated_elt.category_id = new_category;
        axios
          .put(`${this.api}/labels/${updated_elt.ID}`, updated_elt)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));

        this.reRender();
      }
    },
    formatCategoryLabel: label => {
      let sentence = label.toLowerCase().split(" ");
      label = sentence.map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
      return label.trim();
    },
    addCategory() {
      this.new_category_label = this.formatCategoryLabel(
        this.new_category_label
      );
      axios
        .post(`${this.api}/categories`, { label: this.new_category_label })
        .then(res => {
          console.log(res.data);
          this.categories.push({
            ID: res.data,
            label: this.new_category_label
          });
          this.labels_per_cat[res.data] = [];
          this.new_category_label = "";
          this.$refs["closeModal"].click();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>