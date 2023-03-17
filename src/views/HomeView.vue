<script setup>

    import { ref } from 'vue';

    import { todosFactory } from '../to_do_setup';

    //const { to_do_incompleted, to_do_completed, toggle} = todosFactory();

    const {todosIncompleted, todosCompleted, toggle, deleteTodo} = todosFactory();

</script>


<template>
    <main class="container">
        <h3>TO-DO LIST:</h3>

        <p v-if="todosIncompleted.length === 0">Nada por hacer :D</p>

        <ul id="incomplete-tasks">
            <li v-for="todo in todosIncompleted" :key="todo.id" >
                <input type="checkbox" @click="toggle(todo.id)">
                <label @click="toggle(todo.id)">{{ todo.name }}</label>
                <input type="text">
                <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>


        <h3>Completados:</h3>
        <ul id="completed-tasks">
            <li v-for="todo in todosCompleted" :key="todo.id" >
                <input type="checkbox" checked @click="toggle(todo.id)">
                <label @click="toggle(todo.id)">{{ todo.name }}</label>
                <input type="text">
                <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>
    </main>

</template>


<style>
    @import '../assets/base.css';
</style>