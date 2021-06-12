<template>
    <div  class="card">
        <slot></slot>
    </div>
</template>
<style scoped>
.card {
  position: relative;
  border-radius:5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  border-bottom: 3px solid;
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
  background-color: #f6f6f6;
  max-width: 45rem;
}
</style>