<template>
    <!-- modal -->
          <div id="myModal" class="modal" @click.self="onCloseModal()">
            <div class="modal-content modal-dialog-scrollable" :class=" size ? 'modal-large' : 'modal-small' ">
              <div class="modal-header">
                <span class="modal-title">{{ title }}</span>
                <span class="close" @click="onCloseModal()">&times;</span>
              </div>
              <div class="modal-body">
                <slot name="body"></slot>
              </div>
              <div class="modal-footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
</template>
<script>
export default {
    props:{
        title:{
            type: String,
            required: true,
        },
        size:{
          type: Boolean,
          default: true,
        }
    },
    created(){
      this.$store.commit("showModal", true );
    },
    beforeUnmount() {
      this.$store.commit("showModal",false);
      console.log("close");
    },
    methods: {
        onCloseModal(){
            this.$emit("closeModal");
        }
    },
}
</script>
<style scoped>

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  padding-top: 85px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  z-index: 99;
}
/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 0.1rem;
  border: 1px solid #888;
  min-height: 60%;
}
.modal-large{
  width: 90%;
}
.modal-small{
  width: 60%;
}
.modal-header{
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;

}
.modal-title{
  margin: 0 auto;
  font-size: 1.5rem;
}
.modal-body{
  padding: 0.2rem;
  background-color: #f0f0f7;
}
.close {
  color: #9896ac;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 50%;
}
.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}
</style>