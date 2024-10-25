<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['user']);
    const userData = props.user.data;

    const switchCheckbox = () => {
        props.user.checked = !props.user.checked;
    }

</script>

<template>
    <tr>
        <td><input type="checkbox" v-bind:value="props.user.checked" @input="switchCheckbox"/></td>
        <td>{{ userData.email }}</td>
        <td>{{ userData.surname }}</td>
        <td>{{ userData.firstName }}</td>
        <td>{{ userData.phone }}</td>
    </tr>
</template>

<style scoped src="../styles/login_form_common.css"></style>