import Vue from 'vue'

import Header from '~/components/partials/Header.vue'

import Input from '~/components/UI/inputs/Input.vue'
import Button from '~/components/UI/Button.vue'
import Paginator from '~/components/UI/Paginator.vue'


// Регистрирую глобальные компоненты
Vue.component('A-Header', Header);

Vue.component('InputComponent', Input);
Vue.component('Button', Button);
Vue.component('Paginator', Paginator);