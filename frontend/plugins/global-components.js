import vue from 'vue'

import Header from '~/components/partials/Header.vue'

import Input from '~/components/UI/Input.vue'
import Button from '~/components/UI/Button.vue'
import Paginator from '~/components/UI/Paginator.vue'


// Регистрирую глобальные компоненты
vue.component('A-Header', Header);

vue.component('InputComponent', Input);
vue.component('Button', Button);
vue.component('Paginator', Paginator);