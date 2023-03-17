<script setup>

    import {todosFactory} from '../to_do_setup';
    import router from '../router';

    const {add} = todosFactory();

    const addAndNavigate = (name) => {
        add(name);
        router.push('/');
    };

</script>

<template>
    <section class="container">
        <div>
            <form action="">
                <label for="new-task">Agrega nueva tarea</label>
                <input id="new-task" type="text" autofocus v-model="nameToDo">
                <button type="add" @click="addAndNavigate(nameToDo)">Add</button>
            </form>

        </div>

    </section>

</template>

<style></style>