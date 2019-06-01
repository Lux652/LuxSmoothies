<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Uredi {{ smoothie.title }} smoothie</h2>
    <form @submit.prevent="EditSmoothie()">
      <div class="field title">
        <label for="title">Ime smutača</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field" v-for="(ing, index) in smoothie.ingredients" :key="index">
        <label for="ingredient">Sastojaknpm:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Dodaj sastojak(pritisnite TAB za dodavanje novog sastojka)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Uredi smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from 'slugify';

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        // create slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "Moraš imenovat smoothie buraz!";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Moraš dodat sastojak buraz!";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    }
  },

  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.2em;
}
</style>
