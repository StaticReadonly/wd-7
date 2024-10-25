<script setup>

</script>

<template>
    <div class="admin-panel">
        <h1>Адмін-панель</h1>
        <h3>Управління кулінарними рецептами</h3>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Назва Рецепту</th>
                        <th>Категорія</th>
                        <th>Час приготування</th>
                        <th>Інгредієнти</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Борщ</td>
                        <td>Супи</td>
                        <td>1 год 30 хв</td>
                        <td>Капуста, буряк, картопля, морква</td>
                        <td class="actions">
                            <a href="#"><i class="fa-solid fa-eye"></i></a>
                            <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                            <a href="#"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Олів'є</td>
                        <td>Салати</td>
                        <td>45 хв</td>
                        <td>Картопля, морква, горошок, ковбаса</td>
                        <td class="actions">
                            <a href="#"><i class="fa-solid fa-eye"></i></a>
                            <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                            <a href="#"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Вареники з картоплею</td>
                        <td>Основні страви</td>
                        <td>2 год</td>
                        <td>Картопля, борошно, цибуля, масло</td>
                        <td class="actions">
                            <a href="#"><i class="fa-solid fa-eye"></i></a>
                            <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                            <a href="#"><i class="fa-solid fa-trash-can"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>   
    </div>
</template>

<style>
    @import url('../styles/account_style.css');
</style>