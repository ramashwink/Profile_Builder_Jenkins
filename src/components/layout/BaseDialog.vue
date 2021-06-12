<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <div class="scroll">
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <a @click="tryClose">Close</a>
          </slot>
        </menu>          
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  font-family: 'Montserrat', sans-serif;
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  
  
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #4271d6;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
.dialog-enter-from,
.dialog-leave-to{
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active{
  transition:all 0.3s ease-out;
}

.dialog-leave-active{
  transition:all 0,3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from{
  opacity:1;
  transform:scale(1);
}

.scroll{
  overflow: auto;
  max-height:70vh;
}



::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>