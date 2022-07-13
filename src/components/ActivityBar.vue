<template>
  <div class="activitybar">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activitybar {
  width: 48px;
  height: 100%;
  display: block;
  left: 0;
  position: absolute;
  border-right: 1px solid #dadce0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
