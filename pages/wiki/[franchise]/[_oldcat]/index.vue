<script setup lang="ts">
const route = useRoute();
navigateTo(`wiki/${route.params.franchise}/category/${route.params._oldcat}`);
</script>