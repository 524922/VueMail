<template>
    <div>
        <m-header></m-header>
        <!-- 子路由的出口-->
        <router-view></router-view>
    </div>
</template>

<script>
    import MHeader from '@/common/MyHeader';
    export default {
        components: {
            MHeader,
        },
    }
</script>

<style lang="scss" scoped>

</style>
