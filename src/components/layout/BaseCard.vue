<template>
    <div class="card">
        <slot></slot>
    </div>
</template>


<style scoped>
.card {
  position: relative;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  background-color: #f6f6f6;
  max-width: 45rem;
}

</style>