<script setup>
    import Footer from '@/components/Footer.vue';
</script>

<template>
    <main class="main-hght main-mrgn">
        <div class="slider">
            <input checked type="radio" name="slider" id="switch1">
            <input type="radio" name="slider" id="switch2">
            <input type="radio" name="slider" id="switch3">
            <input type="radio" name="slider" id="switch4">
            <div class="slides">
                <div class="overflow">
                    <div class="slider-inner">
                        <div class="slide"><img src="../assets/1.jpg" style="width:100%;">
                        </div>
                        <div class="slide"> <img src="../assets/2.jpg" style="width:100%;">
                        </div>
                        <div class="slide"><img src="../assets/3.jpg" style="width:100%;">
                        </div>
                        <div class="slide"><img src="../assets/4.jpg" style="width:100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="arrows">
                <label for="switch1"></label>
                <label for="switch2"></label>
                <label for="switch3"></label>
                <label for="switch4"></label>
            </div>
            <div class="dots">
                <label for="switch1"></label>
                <label for="switch2"></label>
                <label for="switch3"></label>
                <label for="switch4"></label>
            </div>
        </div>
        <div class="container">
            <div class="news">
                <h3>Новини</h3>
                <h4>1. Осінній сезон: ТОП-5 рецептів з гарбуза</h4>
                <p>
                    З приходом осені гарбуз стає головною зіркою на кухні! Ми підготували для вас п'ять найсмачніших
                    рецептів, які допоможуть розкрити всі смакові відтінки цього осіннього овоча. Від класичного
                    крем-супу з гарбуза до оригінальних гарбузових десертів — кожен знайде щось для себе!
                </p>
                <h4>2. Нове меню на сайті: рецепти зі світової кухні</h4>
                <p>
                    Ми раді оголосити про розширення нашого кулінарного блогу! Тепер на нашому сайті ви знайдете рецепти
                    зі всього світу — від італійської пасти до мексиканських тако. Вивчайте нові страви та дивуйте
                    рідних вишуканими вечерями.
                </p>
                <h4>3. Поради від шеф-кухаря: Як правильно обрати оливкову олію?</h4>
                <p>
                    Оливкова олія — це ключовий інгредієнт багатьох страв, але як вибрати якісну олію? Наш експерт-шеф
                    ділиться порадами, як не помилитися при покупці та як використовувати олію для приготування
                    найкращих страв.
                </p>
                <h4>4. Знижка 20% на кулінарні майстер-класи цього місяця!</h4>
                <p>
                    Мрієте навчитися готувати як справжній шеф-кухар? Протягом цього місяця ви можете записатися на наші
                    кулінарні майстер-класи зі знижкою 20%! Поспішайте, кількість місць обмежена!
                </p>
            </div>
            <div class="project">
                <h3>Про наш проект</h3>
                <h4>1. Наш кулінарний проєкт: Об'єднуємо смаки світу на одній платформі</h4>
                <p>
                    Наш проєкт — це більше, ніж просто кулінарний сайт. Ми створили простір, де кожен може знайти
                    натхнення для кулінарних експериментів, незалежно від рівня підготовки. Ми об'єднуємо рецепти з
                    усього світу, щоб ви могли вивчати нові кулінарні культури, покращувати свої навички та тішити
                    близьких неймовірними стравами.
                </p>
                <h4>2. Місія нашого проєкту: Робити кулінарію доступною для всіх</h4>
                <p>
                    Наша місія — зробити кулінарне мистецтво доступним для кожного. Ми пропонуємо прості у виконанні
                    рецепти з покроковими інструкціями та корисні поради від професійних кухарів, щоб кожен міг готувати
                    як справжній майстер. Ми віримо, що кожна страва — це не лише їжа, а й спосіб виразити свою любов та
                    креативність.
                </p>
                <h4>3. Команда професіоналів: Знання і досвід — основа нашого проєкту</h4>
                <p>
                    Наша команда складається з професійних шеф-кухарів, нутриціологів та кулінарних експертів, які з
                    радістю діляться своїм досвідом. Ми постійно оновлюємо контент, додаючи нові рецепти, поради та
                    кулінарні лайфхаки. Наші спеціалісти завжди готові допомогти вам зробити правильний вибір
                    інгредієнтів і навчитися готувати швидко, корисно та смачно.
                </p>
            </div>
        </div>

    </main>
    <Footer/>
</template>

<style scoped src="../styles/index_style.css"></style>