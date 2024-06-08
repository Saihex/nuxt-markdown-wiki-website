<script setup lang="ts">
const route = useRoute();
await navigateTo(`wiki/${route.params.franchise}/category/${route.params._oldcat}/${route.params.old_page}`);
</script>