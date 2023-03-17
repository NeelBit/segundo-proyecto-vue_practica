<script setup>
    import { ref } from 'vue';
    import { todosFactory } from './to_do_setup';
    import { RouterLink, RouterView } from 'vue-router'

    import todoService from './services/toDoServices';

    const {update} = todosFactory();
    const isLoading = ref(true);

    async function prefetch() {
        update(await todoService.getTodos());
        isLoading.value = false;
    }
    prefetch();

</script>

<template>

    <header>
        <h1>Segundo proyecto hecho en Vue.js 3 --- TO-DO list</h1>
        <nav>
            <RouterLink to="/">To-do list</RouterLink>
            <RouterLink to="/new">Nueva tarea</RouterLink>
        </nav>
    </header>

    <h2 v-if="isLoading">
        Cargando lista de tareas...
    </h2>
    <template v-else>
        <RouterView />
    </template>


</template>

<style>
    @import 'assets/base.css';
</style>
