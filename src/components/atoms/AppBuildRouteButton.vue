<script setup lang="ts"></script>

<template>
  <button type="button"><slot>Build a route</slot></button>
</template>

<style lang="css" scoped>
button {
  background: #ffb800;
  border-radius: 20px;
  text-align: center;
  padding-block: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  border: none;
  text-transform: uppercase;
  width: 177px;
  cursor: pointer;
  margin-top: 40px;
  display: inline-block;
}
</style>
